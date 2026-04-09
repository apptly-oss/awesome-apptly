const BASE_URL = 'https://pkg.go.dev/';

/** Props accepted by the `:go-pkg` MDC component. */
export interface GoPkgProps {
  /** Subdirectory within the module (e.g. `pkg/client`). */
  dir?: string
  /** Function name — links to `#Func`, label gets `()` suffix. Takes precedence over `sym`. */
  func?: string
  /** Override the display text. */
  label?: string
  /** Go module path (e.g. `darvaza.org/resolver`). */
  mod: string
  /** Show only the symbol/function name, omit the package prefix. Preserves `()` suffix for functions. */
  short?: boolean
  /** Type or constant name — links to `#Symbol`. */
  sym?: string
}

/** Resolved link data for a Go package reference. */
export interface GoPkgLink {
  /** Accessible label including new-tab indicator for external links. */
  ariaLabel: string
  /** Whether the link points to an internal project page. */
  internal: boolean
  /** Display text for the link. */
  label: string
  /** Tooltip text. */
  title: string
  /** Link target — internal project path or pkg.go.dev URL. */
  url: string
}

/** Build the pkg.go.dev URL for a module, optional subpackage, and optional symbol. */
function makeGoPkgURL(module: string, directory?: string, symbol?: string): string {
  const pkg = directory ? `${module}/${directory}` : module;
  const base = `${BASE_URL}${pkg}`;
  return symbol ? `${base}#${symbol}` : base;
}

/** Compose the display label from props, resolved symbol, and suffix. */
function makeGoPkgLabel(props: GoPkgProps, symbol?: string, suffix = ''): string {
  if (props.label) return props.label;
  if (symbol) {
    if (props.short) return `${symbol}${suffix}`;
    const base = (props.dir ?? props.mod).split('/').findLast(Boolean) ?? props.mod;
    return `${base}.${symbol}${suffix}`;
  }
  return props.dir ?? props.mod;
}

/**
 * Resolve all link data for a Go package reference.
 *
 * When `internalPath` is provided and the reference is to the
 * module as a whole (no `dir`, `sym`, or `func`), the link
 * points to the internal project page instead of pkg.go.dev.
 */
export function resolveGoPkg(props: GoPkgProps, internalPath?: string): GoPkgLink {
  const symbol = props.func ?? props.sym;
  const suffix = props.func ? '()' : '';
  const pkg = props.dir ? `${props.mod}/${props.dir}` : props.mod;

  // Internal only when pointing at the module as a whole —
  // sub-packages and symbols are better served by pkg.go.dev.
  const internal = !!internalPath && !props.dir && !symbol;
  const url = internal ? internalPath : makeGoPkgURL(props.mod, props.dir, symbol);
  const label = makeGoPkgLabel(props, symbol, suffix);
  const title = internal ?
    `${pkg} on this site` :
    (symbol ?
      `${pkg}.${symbol} on pkg.go.dev` :
      `${pkg} on pkg.go.dev`);

  return {
    ariaLabel: internal ? title : `${title} (opens in new tab)`,
    internal,
    label,
    title,
    url,
  };
}
