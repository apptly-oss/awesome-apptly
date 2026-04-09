import { logos } from '#badge-logos';

// Go module paths: domain.tld/path — first segment must contain a dot
const GO_MODULE_RE = /^[a-z0-9][\w.-]*\.[a-z]{2,}(\/[\w.~-]+)*$/i;

// Go proxy requires uppercase letters encoded as !lowercase
const escapeModulePath = (path: string) =>
  path.replaceAll(/[A-Z]/g, (c) => `!${c.toLowerCase()}`);

const badge = new BadgeHandler({
  logo: logos.go,
  idSuffix: 'go',
  color: '007D9C',
  pattern: GO_MODULE_RE,

  async fetch(modulePath, logger) {
    const proxyUrl = `https://proxy.golang.org/${escapeModulePath(modulePath)}/@latest`;
    const info = await $fetch<{ Time: string; Version: string }>(proxyUrl).catch((error) => {
      logger.warn(`failed to fetch ${modulePath}:`, error);
      return undefined;
    });

    return { version: info?.Version, lastModified: parseDate(info?.Time) };
  },
});

export default badge.eventHandler;
