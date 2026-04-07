<script setup lang="ts">
const props = defineProps<{
  go?: string
  licence?: string
  npm?: string
  repo?: string
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
    <BadgeVersionNpm
      v-if="npm"
      :pkg="npm"
    />
    <BadgeVersionGo
      v-if="go"
      :mod="go"
    />
  </div>
</template>
