import { logos } from '#badge-logos';

const COLOR = '007D9C';

// Go module paths: domain.tld/path — first segment must contain a dot
const GO_MODULE_RE = /^[a-z0-9][\w.-]*\.[a-z]{2,}(\/[\w.~-]+)*$/i;

export default defineEventHandler(async (event) => {
  const pkg = getRouterParam(event, 'package');
  if (!pkg || !GO_MODULE_RE.test(pkg)) {
    return renderBadgeError(event, { logo: logos.go, idSuffix: 'go' });
  }

  const proxyUrl = `https://proxy.golang.org/${pkg}/@latest`;
  const info = await $fetch<{ Version: string }>(proxyUrl).catch((error) => {
    console.warn(`[badge/go] failed to fetch ${pkg}:`, error);
    return undefined;
  });

  return renderBadge(event, { logo: logos.go, idSuffix: 'go', color: COLOR, version: info?.Version });
});
