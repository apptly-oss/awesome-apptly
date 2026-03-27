<script setup lang="ts">
definePageMeta({ key: (route) => route.path });

const route = useRoute();

const { data: page } = await useAsyncData(() => 'page-' + route.path, () => {
  return queryCollection('projects').path(route.path).first();
});

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const { languageSlugs } = await useCategories();
</script>

<template>
  <article v-if="page">
    <NuxtLink
      to="/"
      class="text-sm text-blue-600 hover:text-blue-800"
    >
      &larr; All projects
    </NuxtLink>

    <h1 class="mt-4 text-3xl font-bold">
      {{ page.title }}
    </h1>
    <p
      v-if="page.description"
      class="mt-2 text-gray-600"
    >
      {{ page.description }}
    </p>

    <BadgeList
      class="mt-3"
      :categories="page.category"
      :language-slugs="languageSlugs"
      linked
    />

    <div class="prose mt-8">
      <ContentRenderer :value="page" />
    </div>
  </article>
</template>
