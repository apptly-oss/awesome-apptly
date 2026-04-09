<script lang="ts">
import type { NpmPkgProps } from '~/utils/npm-pkg';
</script>

<script setup lang="ts">
/**
 * Inline link to an npm package — resolves to internal project
 * page or npmjs.com. External links get a trailing npm icon
 * via CSS (`modules/external-link-icons.ts`), scoped to `.prose`.
 */
const props = defineProps<NpmPkgProps>();

const { ready, resolve: resolveInternal } = useNpmPackages();

const link = computed(() =>
  resolveNpmPkg(props, resolveInternal(props.pkg)),
);
</script>

<template>
  <NuxtLink
    v-if="link.internal"
    :to="link.url"
    :title="link.title"
    :aria-label="link.ariaLabel"
    class="text-inherit hover:underline"
  >{{ link.label }}</NuxtLink>
  <span
    v-else-if="!ready"
    :title="link.title"
    class="text-inherit"
  >{{ link.label }}</span>
  <a
    v-else
    :href="link.url"
    :title="link.title"
    :aria-label="link.ariaLabel"
    target="_blank"
    rel="noopener noreferrer"
    class="text-inherit hover:underline"
  >{{ link.label }}</a>
</template>
