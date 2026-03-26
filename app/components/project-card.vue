<script setup lang="ts">
defineProps<{
  path: string
  title: string
  description?: string
  category: string[]
  language: string[]
}>();
</script>

<template>
  <NuxtLink
    :to="path"
    class="block rounded-lg border border-gray-200 p-4 transition hover:border-blue-300 hover:shadow-sm"
  >
    <h2 class="text-lg font-semibold text-blue-600 hover:text-blue-800">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-1 text-sm text-gray-600"
    >
      {{ description }}
    </p>
    <BadgeList
      class="mt-2"
      :categories="category"
      :languages="language"
    />
  </NuxtLink>
</template>
