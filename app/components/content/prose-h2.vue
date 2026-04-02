<script setup lang="ts">
/** Prose h2 override — plain heading with hover-visible `#` anchor glyph. */
const props = defineProps<{
  /** Heading anchor ID, used for the `id` attribute and `#` permalink. */
  id?: string
}>();
</script>

<template>
  <h2
    :id="id"
    class="group"
  >
    <slot />
    <a
      v-if="props.id"
      :href="`#${props.id}`"
      class="ml-2 no-underline text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 hover:text-gray-500"
      aria-label="Permalink to this section"
    >#</a>
  </h2>
</template>
