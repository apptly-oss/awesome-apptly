<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .order('title', 'ASC')
    .all();
});
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold">
      Awesome Apptly
    </h1>
    <p class="text-gray-600">
      Open-source projects and products by <NuxtLink to="https://apptly.co">Apptly Software</NuxtLink>.
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
          :language="project.language"
        />
      </li>
    </ul>
  </div>
</template>
