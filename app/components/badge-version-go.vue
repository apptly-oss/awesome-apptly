<script setup lang="ts">
const props = defineProps<{
  dir?: string
  mod: string
}>();

const pkg = computed(() => props.dir ? `${props.mod}/${props.dir}` : props.mod);
const source = computed(() => `/api/badge/go/${props.mod}`);
const href = computed(() => `https://pkg.go.dev/${pkg.value}`);
const alt = computed(() => `Go version for ${pkg.value}`);
const title = computed(() => `Go module ${pkg.value}`);
</script>

<template>
  <BadgeVersion
    :src="source"
    :href="href"
    :alt="alt"
    :title="title"
  />
</template>
