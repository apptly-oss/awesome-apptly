<script lang="ts">
import type { GoPkgProps } from '~/utils/go-pkg';
</script>

<script setup lang="ts">
/**
 * Inline link to pkg.go.dev. The trailing Go icon is added via
 * CSS by `modules/external-link-icons.ts`, scoped to `.prose`.
 */
const props = defineProps<GoPkgProps>();
const link = computed(() => resolveGoPkg(props));
</script>

<template>
  <a
    :href="link.url"
    :title="link.title"
    :aria-label="link.ariaLabel"
    target="_blank"
    rel="noopener noreferrer"
    class="text-inherit hover:underline"
  >{{ link.label }}</a>
</template>
