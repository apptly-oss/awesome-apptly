import type { H3Event } from 'h3';
import { makeBadge } from 'badge-maker';

const CACHE_MAX_AGE = 3600;
const CACHE_MAX_AGE_ERROR = 60;
const LABEL_COLOR = '5C5C5C';
const COLOR_ERROR = 'lightgray';
const VERSION_UNKNOWN = 'unknown';

interface BadgeOptions {
  logo: string
  idSuffix: string
  color: string
  version: string | undefined
}

export function renderBadge(event: H3Event, options: BadgeOptions): string {
  const { logo, idSuffix, color, version } = options;
  const message = version ?? VERSION_UNKNOWN;

  const svg = makeBadge({
    label: ' ',
    message,
    labelColor: LABEL_COLOR,
    color: version ? color : COLOR_ERROR,
    style: 'flat',
    logoBase64: logo,
    idSuffix,
  });

  const maxAge = version ? CACHE_MAX_AGE : CACHE_MAX_AGE_ERROR;

  setHeader(event, 'content-type', 'image/svg+xml');
  setHeader(event, 'cache-control', `public, max-age=${maxAge}, s-maxage=${maxAge}`);

  return svg;
}

export function renderBadgeError(event: H3Event, options: Pick<BadgeOptions, 'idSuffix' | 'logo'>): string {
  setResponseStatus(event, 400);
  return renderBadge(event, { ...options, color: COLOR_ERROR, version: undefined });
}
