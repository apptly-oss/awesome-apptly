import { logos } from '#badge-logos';

// npm package names: @scope/name or name
const NPM_PACKAGE_RE = /^(@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;

const badge = new BadgeHandler({
  logo: logos.npm,
  idSuffix: 'npm',
  color: 'CB3837',
  pattern: NPM_PACKAGE_RE,

  async fetch(pkg, logger) {
    const registryUrl = `https://registry.npmjs.org/${pkg}/latest`;
    const response = await $fetch.raw<{ version: string }>(registryUrl).catch((error) => {
      logger.warn(`failed to fetch ${pkg}:`, error);
      return undefined;
    });

    return {
      version: response?._data?.version,
      lastModified: parseDate(response?.headers.get('last-modified') || undefined),
    };
  },
});

export default badge.eventHandler;
