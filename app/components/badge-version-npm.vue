<script setup lang="ts">
const props = defineProps<{
  pkg: string
}>();

const source = computed(() => `/api/badge/npm/${props.pkg}`);
const href = computed(() => `https://www.npmjs.com/package/${props.pkg}`);
const alt = computed(() => `npm version for ${props.pkg}`);
const title = computed(() => `npm package ${props.pkg}`);
</script>

<template>
  <BadgeVersion
    :src="source"
    :href="href"
    :alt="alt"
    :title="title"
  />
</template>
