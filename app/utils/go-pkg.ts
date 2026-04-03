const BASE_URL = 'https://pkg.go.dev/';

/** Props accepted by the `:go-pkg` MDC component. */
export interface GoPkgProps {
  /** Go module path (e.g. `darvaza.org/resolver`). */
  mod: string
  /** Subdirectory within the module (e.g. `pkg/client`). */
  dir?: string
  /** Type or constant name — links to `#Symbol`. */
  sym?: string
  /** Function name — links to `#Func`, label gets `()` suffix. Takes precedence over `sym`. */
  func?: string
  /** Show only the symbol/function name, omit the package prefix. Preserves `()` suffix for functions. */
  short?: boolean
  /** Override the display text. */
  label?: string
}

/** Resolved link data for a Go package reference. */
export interface GoPkgLink {
  /** Full URL to pkg.go.dev, optionally with a `#Symbol` fragment. */
  url: string
  /** Display text for the link. */
  label: string
  /** Tooltip text (e.g. `darvaza.org/resolver on pkg.go.dev`). */
  title: string
  /** Accessible label including new-tab indicator. */
  ariaLabel: string
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

/** Resolve all link data for a Go package reference. */
export function resolveGoPkg(props: GoPkgProps): GoPkgLink {
  const symbol = props.func ?? props.sym;
  const suffix = props.func ? '()' : '';
  const pkg = props.dir ? `${props.mod}/${props.dir}` : props.mod;

  const url = makeGoPkgURL(props.mod, props.dir, symbol);
  const label = makeGoPkgLabel(props, symbol, suffix);
  const title = symbol ?
    `${pkg}.${symbol} on pkg.go.dev` :
    `${pkg} on pkg.go.dev`;

  return {
    url,
    label,
    title,
    ariaLabel: `${title} (opens in new tab)`,
  };
}
