<script setup lang="ts">
const props = defineProps<{
  categories: string[]
  languageSlugs: string[]
  linked?: boolean
}>();

function badgeClass(cat: string): string {
  return props.languageSlugs.includes(cat) ? 'badge-language' : 'badge-category';
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <template
      v-for="cat in categories"
      :key="cat"
    >
      <NuxtLink
        v-if="linked"
        :to="`/${cat}`"
        :class="badgeClass(cat)"
      >
        {{ cat }}
      </NuxtLink>
      <span
        v-else
        :class="badgeClass(cat)"
      >
        {{ cat }}
      </span>
    </template>
  </div>
</template>
