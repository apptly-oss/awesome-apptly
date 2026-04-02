<script setup lang="ts">
/** Inline link to pkg.go.dev with a trailing Go icon. */
interface GoPkgProps {
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

const props = defineProps<GoPkgProps>();

const symbol = computed(() => props.func ?? props.sym);
const suffix = computed(() => props.func ? '()' : '');
const pkg = computed(() => props.dir ? `${props.mod}/${props.dir}` : props.mod);

const href = computed(() => {
  const base = `https://pkg.go.dev/${pkg.value}`;
  return symbol.value ? `${base}#${symbol.value}` : base;
});

const displayLabel = computed(() => {
  if (props.label) return props.label;
  if (symbol.value) {
    if (props.short) return `${symbol.value}${suffix.value}`;
    const base = (props.dir ?? props.mod).split('/').findLast(Boolean) ?? props.mod;
    return `${base}.${symbol.value}${suffix.value}`;
  }
  return props.dir ?? props.mod;
});

const title = computed(() => {
  if (symbol.value) return `${pkg.value}.${symbol.value} on pkg.go.dev`;
  return `${pkg.value} on pkg.go.dev`;
});

const ariaLabel = computed(() => `${title.value} (opens in new tab)`);
</script>

<template>
  <a
    :href="href"
    :title="title"
    :aria-label="ariaLabel"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-1 text-inherit hover:underline"
  >
    <span>{{ displayLabel }}</span>
    <Icon
      name="simple-icons:go"
      class="h-4 w-4"
      aria-hidden="true"
    />
  </a>
</template>
