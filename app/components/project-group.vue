<script setup lang="ts">
defineProps<{
  name: string
  href: string
  description?: string
  projects: Array<{
    path: string
    title: string
    description?: string
    category: string[]
  }>
  languageSlugs: string[]
}>();
</script>

<template>
  <section class="space-y-3">
    <h2 class="text-xl font-semibold">
      <NuxtLink
        :to="href"
        class="text-gray-900 hover:text-blue-600"
      >
        {{ name }}
      </NuxtLink>
    </h2>
    <p
      v-if="description"
      class="text-sm text-gray-600"
    >
      {{ description }}
    </p>
    <ul class="space-y-3">
      <li
        v-for="project in projects"
        :key="project.path"
      >
        <ProjectCard
          :path="project.path"
          :title="project.title"
          :description="project.description"
          :category="project.category"
          :language-slugs="languageSlugs"
        />
      </li>
    </ul>
  </section>
</template>
