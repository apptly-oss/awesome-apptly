<script setup lang="ts">
defineProps<{
  description?: string
  href: string
  languageSlugs: string[]
  name: string
  projects: Array<{
    category: string[]
    description?: string
    licence?: string
    path: string
    repo?: string
    title: string
  }>
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
          :repo="project.repo"
          :licence="project.licence"
        />
      </li>
    </ul>
  </section>
</template>
