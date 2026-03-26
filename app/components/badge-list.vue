<script setup lang="ts">
defineProps<{
  categories: string[]
  languages: string[]
  linked?: boolean
}>();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <template v-if="linked">
      <NuxtLink
        v-for="cat in categories"
        :key="cat"
        :to="`/${cat}`"
        class="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 hover:bg-blue-200"
      >
        {{ cat }}
      </NuxtLink>
    </template>
    <template v-else>
      <span
        v-for="cat in categories"
        :key="cat"
        class="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
      >
        {{ cat }}
      </span>
    </template>
    <span
      v-for="lang in languages"
      :key="lang"
      class="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
    >
      {{ lang }}
    </span>
  </div>
</template>
