<script setup lang="ts">
defineProps<{
  categories: string[]
  languages: string[]
}>();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="cat in categories"
      :key="cat"
      class="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
    >
      {{ cat }}
    </span>
    <span
      v-for="lang in languages"
      :key="lang"
      class="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
    >
      {{ lang }}
    </span>
  </div>
</template>
