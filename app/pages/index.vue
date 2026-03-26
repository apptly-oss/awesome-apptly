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
      Open-source projects and products by Apptly Software.
    </p>

    <section class="space-y-4">
      <ul class="space-y-3">
        <li
          v-for="project in projects"
          :key="project.path"
        >
          <NuxtLink
            :to="project.path"
            class="block rounded-lg border border-gray-200 p-4 transition hover:border-blue-300 hover:shadow-sm"
          >
            <h2 class="text-lg font-semibold text-blue-600 hover:text-blue-800">
              {{ project.title }}
            </h2>
            <p
              v-if="project.description"
              class="mt-1 text-sm text-gray-600"
            >
              {{ project.description }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
