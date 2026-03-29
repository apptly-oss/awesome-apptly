<script setup lang="ts">
const props = defineProps<{
  mod: string
}>();

const source = computed(() => `/api/badge/go/${props.mod}`);
const href = computed(() => `https://pkg.go.dev/${props.mod}`);
const alt = computed(() => `Go version for ${props.mod}`);
const title = computed(() => `Go module ${props.mod}`);
</script>

<template>
  <BadgeVersion
    :src="source"
    :href="href"
    :alt="alt"
    :title="title"
  />
</template>
