import type { ConsolaInstance } from 'consola';
import type { EventHandler, H3Event } from 'h3';
import { makeBadge } from 'badge-maker';
import { consola } from 'consola';

// CF Workers extension — caches.default is not in the standard CacheStorage type
declare global {
  interface CacheStorage {
    readonly default: Cache
  }
}

const CACHE_MAX_AGE = 3600; // browser: 1 hour
const CACHE_S_MAX_AGE = 300; // CF edge: 5 minutes
const CACHE_MAX_AGE_ERROR = 60;
const LABEL_COLOR = '5C5C5C';
const COLOR_ERROR = 'lightgray';
const VERSION_UNKNOWN = 'unknown';

export interface BadgeResult {
  version: string | undefined
  lastModified?: Date
}

interface BadgeHandlerOptions {
  logo: string
  idSuffix: string
  color: string
  pattern: RegExp
  logger?: ConsolaInstance
  fetch: (pkg: string, logger: ConsolaInstance) => Promise<BadgeResult>
}

/** Parse a date string, returning undefined for missing or invalid values. */
export function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export class BadgeHandler {
  private readonly logo: string;
  private readonly idSuffix: string;
  private readonly color: string;
  private readonly pattern: RegExp;
  private readonly logger: ConsolaInstance;
  private readonly fetchUpstream: (pkg: string, logger: ConsolaInstance) => Promise<BadgeResult>;

  readonly eventHandler: EventHandler;

  constructor(options: BadgeHandlerOptions) {
    this.logo = options.logo;
    this.idSuffix = options.idSuffix;
    this.color = options.color;
    this.pattern = options.pattern;
    this.logger = options.logger ?? consola.withTag(`badge:${options.idSuffix}`);
    this.fetchUpstream = options.fetch;
    this.eventHandler = defineEventHandler((event) => this.handle(event));
  }

  private async handle(event: H3Event): Promise<string> {
    switch (event.method) {
      case 'GET':
      case 'HEAD':
      case 'DELETE':
        break;
      default:
        setResponseStatus(event, 405);
        setHeader(event, 'allow', 'GET, HEAD, DELETE');
        return '';
    }

    const pkg = this.validatePackage(event);
    if (!pkg) {
      setResponseStatus(event, 400);
      if (event.method === 'DELETE') return '';
      return this.renderBadge(event, { version: undefined });
    }

    if (event.method === 'DELETE') {
      await this.purgeBadgeCache(event);
      setResponseStatus(event, 204);
      return '';
    }

    const result = await this.fetchUpstream(pkg, this.logger);
    return this.renderBadge(event, result);
  }

  private validatePackage(event: H3Event): string | undefined {
    const pkg = getRouterParam(event, 'package');
    if (pkg && this.pattern.test(pkg)) return pkg;
    return undefined;
  }

  /** Set cache headers and return true if the client cache is still fresh (304). */
  private setCacheHeaders(event: H3Event, { version, lastModified }: BadgeResult): boolean {
    if (!version) {
      setHeader(event, 'cache-control', `public, max-age=${CACHE_MAX_AGE_ERROR}, s-maxage=${CACHE_MAX_AGE_ERROR}`);
      return false;
    }

    const etag = `W/"${version}"`;
    setHeader(event, 'cache-control', `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_S_MAX_AGE}`);
    setHeader(event, 'etag', etag);
    if (lastModified) {
      setHeader(event, 'last-modified', lastModified.toUTCString());
    }

    // h3 doesn't check conditional headers automatically
    const ifNoneMatch = getRequestHeader(event, 'if-none-match');
    return ifNoneMatch === etag;
  }

  private renderBadge(event: H3Event, result: BadgeResult): string {
    if (this.setCacheHeaders(event, result)) {
      setResponseStatus(event, 304);
      return '';
    }

    setHeader(event, 'content-type', 'image/svg+xml');

    return makeBadge({
      label: ' ',
      message: result.version ?? VERSION_UNKNOWN,
      labelColor: LABEL_COLOR,
      color: result.version ? this.color : COLOR_ERROR,
      style: 'flat',
      logoBase64: this.logo,
      idSuffix: this.idSuffix,
    });
  }

  private async purgeBadgeCache(event: H3Event): Promise<void> {
    try {
      if (typeof caches !== 'undefined' && caches.default) {
        await caches.default.delete(getRequestURL(event).href);
      }
    } catch (error) {
      this.logger.warn('edge cache purge failed:', error);
    }
  }
}
