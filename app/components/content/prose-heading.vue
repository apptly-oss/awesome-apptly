<script lang="ts">
/** Shared props for prose heading overrides. */
export interface ProseHeadingProps {
  /** Heading anchor ID, used for the `id` attribute and `#` permalink. */
  id?: string
  /** Anchor glyph shown on hover. */
  glyph?: string
}
</script>

<script setup lang="ts">
/** Generic prose heading with hover-visible anchor glyph. */
const props = withDefaults(defineProps<ProseHeadingProps & {
  /** HTML heading element to render. */
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>(), {
  id: undefined,
  glyph: '\u00A7',
});
</script>

<template>
  <component
    :is="props.as"
    :id="props.id"
    class="group"
  >
    <slot />
    <a
      v-if="props.id"
      :href="`#${props.id}`"
      class="ml-2 no-underline text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 hover:text-gray-500"
      aria-label="Permalink to this section"
    >{{ props.glyph }}</a>
  </component>
</template>
