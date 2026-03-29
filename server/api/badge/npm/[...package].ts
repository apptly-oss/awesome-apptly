import { logos } from '#badge-logos';

const COLOR = 'CB3837';

// npm package names: @scope/name or name
const NPM_PACKAGE_RE = /^(@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;

export default defineEventHandler(async (event) => {
  const pkg = getRouterParam(event, 'package');
  if (!pkg || !NPM_PACKAGE_RE.test(pkg)) {
    return renderBadgeError(event, { logo: logos.npm, idSuffix: 'npm' });
  }

  const registryUrl = `https://registry.npmjs.org/${pkg}/latest`;
  const info = await $fetch<{ version: string }>(registryUrl).catch((error) => {
    console.warn(`[badge/npm] failed to fetch ${pkg}:`, error);
    return undefined;
  });

  return renderBadge(event, { logo: logos.npm, idSuffix: 'npm', color: COLOR, version: info?.version });
});
