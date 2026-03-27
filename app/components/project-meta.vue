<script setup lang="ts">
const props = defineProps<{
  repo?: string
  licence?: string
  npm?: string
  go?: string
}>();

const repoInfo = computed(() =>
  props.repo ? parseRepo(props.repo) : undefined);
</script>

<template>
  <div
    v-if="repoInfo || licence || npm || go"
    class="flex flex-wrap items-center gap-3 text-sm"
  >
    <a
      v-if="repoInfo"
      :href="repoInfo.url"
      target="_blank"
      rel="noopener"
      class="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900"
    >
      <IconGithub class="h-4 w-4" />
      {{ repoInfo.label }}
    </a>
    <span
      v-if="licence"
      class="badge-licence"
    >
      {{ licence }}
    </span>
    <a
      v-if="npm"
      :href="`https://www.npmjs.com/package/${npm}`"
      target="_blank"
      rel="noopener"
    >
      <img
        :src="`https://img.shields.io/npm/v/${npm}.svg`"
        :alt="`npm version for ${npm}`"
        class="h-5"
      >
    </a>
    <a
      v-if="go"
      :href="`https://pkg.go.dev/${go}`"
      target="_blank"
      rel="noopener"
    >
      <img
        :src="`https://pkg.go.dev/badge/${go}.svg`"
        :alt="`Go reference for ${go}`"
        class="h-5"
      >
    </a>
  </div>
</template>
