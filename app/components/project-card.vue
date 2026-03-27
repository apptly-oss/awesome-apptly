<script setup lang="ts">
defineProps<{
  path: string
  title: string
  description?: string
  category: string[]
  languageSlugs: string[]
  repo?: string
  licence?: string
}>();
</script>

<template>
  <NuxtLink
    :to="path"
    class="block rounded-lg border border-gray-200 p-4 transition hover:border-blue-300 hover:shadow-sm"
  >
    <div class="flex items-start justify-between gap-2">
      <h2 class="text-lg font-semibold text-blue-600 hover:text-blue-800">
        {{ title }}
      </h2>
      <span
        v-if="repo || licence"
        class="flex shrink-0 items-center gap-1.5 text-xs text-gray-400"
      >
        <span v-if="licence">{{ licence }}</span>
        <Icon
          v-if="repo"
          name="simple-icons:github"
          class="h-4 w-4"
        />
      </span>
    </div>
    <p
      v-if="description"
      class="mt-1 text-sm text-gray-600"
    >
      {{ description }}
    </p>
    <BadgeList
      class="mt-2"
      :categories="category"
      :language-slugs="languageSlugs"
    />
  </NuxtLink>
</template>
