<script setup lang="ts">
/** Inline link to pkg.go.dev with a trailing Go icon. */
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
    class="inline-flex items-center gap-1 text-inherit hover:underline"
  >
    <span>{{ link.label }}</span>
    <Icon
      name="simple-icons:go"
      class="h-4 w-4"
      aria-hidden="true"
    />
  </a>
</template>
