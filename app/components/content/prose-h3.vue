<script lang="ts">
import type { ProseHeadingProps } from './prose-heading.vue';
</script>

<script setup lang="ts">
/** Prose h3 override — delegates to ProseHeading with anchor glyph. */
const props = defineProps<ProseHeadingProps>();
</script>

<template>
  <ProseHeading
    :id="props.id"
    :glyph="props.glyph"
    as="h3"
  >
    <slot />
  </ProseHeading>
</template>
