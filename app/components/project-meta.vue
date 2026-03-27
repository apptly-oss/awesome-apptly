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
      <Icon
        name="simple-icons:github"
        class="h-4 w-4"
      />
      {{ repoInfo.label }}
    </a>
    <span
      v-if="licence"
      class="badge-licence"
    >
      {{ licence }}
    </span>
    <BadgeVersion
      v-if="npm"
      :src="`/api/badge/npm/${npm}`"
      :href="`https://www.npmjs.com/package/${npm}`"
      :alt="`npm version for ${npm}`"
      :title="`npm package ${npm}`"
    />
    <BadgeVersion
      v-if="go"
      :src="`/api/badge/go/${go}`"
      :href="`https://pkg.go.dev/${go}`"
      :alt="`Go reference for ${go}`"
      :title="`Go reference for ${go}`"
    />
  </div>
</template>
