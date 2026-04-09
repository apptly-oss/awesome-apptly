const BASE_URL = 'https://www.npmjs.com/package/';

/** Props accepted by the `:npm-pkg` MDC component. */
export interface NpmPkgProps {
  /** Override the display text. */
  label?: string
  /** Full npm package name (e.g. `@poupe/tailwindcss`). */
  pkg: string
  /** Show only the bare name without scope (e.g. `tailwindcss` instead of `@poupe/tailwindcss`). */
  short?: boolean
}

/** Resolved link data for an npm package reference. */
export interface NpmPkgLink {
  /** Accessible label including new-tab indicator for external links. */
  ariaLabel: string
  /** Whether the link points to an internal project page. */
  internal: boolean
  /** Display text for the link. */
  label: string
  /** Tooltip text. */
  title: string
  /** Link target — internal project path or npmjs.com URL. */
  url: string
}

/** Strip the scope prefix from a scoped package name. */
function stripScope(pkg: string): string {
  return pkg.replace(/^@[^/]+\//, '');
}

/** Compose the display label from props. */
function makeLabel(props: NpmPkgProps): string {
  if (props.label) return props.label;
  return props.short ? stripScope(props.pkg) : props.pkg;
}

/**
 * Resolve all link data for an npm package reference.
 *
 * When `internalPath` is provided the link points to the
 * internal project page instead of npmjs.com.
 */
export function resolveNpmPkg(props: NpmPkgProps, internalPath?: string): NpmPkgLink {
  const label = makeLabel(props);
  const internal = !!internalPath;
  const url = internal ? internalPath : `${BASE_URL}${props.pkg}`;
  const title = internal ?
    `${props.pkg} on this site` :
    `${props.pkg} on npm`;

  return {
    ariaLabel: internal ? title : `${title} (opens in new tab)`,
    internal,
    label,
    title,
    url,
  };
}
