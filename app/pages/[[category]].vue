<script setup lang="ts">
definePageMeta({ key: (route) => route.path });

const route = useRoute();
const category = computed(() => route.params.category as string | undefined);
const { sorted, slug, isUmbrella, find, isValid, isUnderUmbrella } = await useCategories();

// Validate category param.
if (category.value && !isValid(category.value)) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const { data: projects } = await useAsyncData(() => 'projects', () => {
  return queryCollection('projects')
    .order('title', 'ASC')
    .all();
});

type Project = NonNullable<typeof projects.value>[number];

// Filtered view: single category.
const filtered = computed(() => {
  if (!category.value || !projects.value) return undefined;
  if (category.value === OTHER_SLUG) {
    return projects.value.filter((p) => !isUnderUmbrella(p.category));
  }
  return projects.value.filter((p) => includes(p.category, category.value));
});

// Category metadata and display name for the current filter.
const currentCategory = computed(() =>
  category.value ? find(category.value) : undefined);

const categoryName = computed(() => {
  if (!category.value) return undefined;
  if (currentCategory.value) return currentCategory.value.title;
  return category.value === OTHER_SLUG ? 'Other' : category.value;
});

// Grouped view: umbrellas + uncategorised.
interface Group { name: string; href: string; description?: string; projects: Project[] }

const groups = computed<Group[]>(() => {
  if (category.value || !projects.value || sorted.value.length === 0) return [];

  const result: Group[] = [];

  for (const cat of sorted.value.filter((c) => isUmbrella(c))) {
    const s = slug(cat);
    const matched = projects.value.filter((p) => includes(p.category, s));
    if (matched.length > 0) {
      result.push({
        name: cat.title,
        href: `/${s}`,
        description: cat.description,
        projects: matched,
      });
    }
  }

  const other = projects.value.filter((p) => !isUnderUmbrella(p.category));
  if (other.length > 0) {
    result.push({ name: 'Other', href: `/${OTHER_SLUG}`, projects: other });
  }

  return result;
});

const title = computed(() =>
  categoryName.value ? `${categoryName.value} — Awesome Apptly` : 'Awesome Apptly');

useHead({ title });
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold">
        <template v-if="category">
          <NuxtLink
            to="/"
            class="text-gray-400 hover:text-blue-600"
          >
            Awesome Apptly
          </NuxtLink>
          <span class="text-gray-400"> / </span>
          {{ categoryName }}
        </template>
        <template v-else>
          Awesome Apptly
        </template>
      </h1>
      <p
        v-if="currentCategory?.description"
        class="mt-2 text-gray-600"
      >
        {{ currentCategory.description }}
      </p>
      <p
        v-else
        class="mt-2 text-gray-600"
      >
        Open-source projects and products by <NuxtLink to="https://apptly.co">Apptly Software</NuxtLink>.
      </p>
    </div>

    <!-- Category filter nav -->
    <nav class="flex flex-wrap gap-2">
      <NuxtLink
        to="/"
        class="rounded-full px-3 py-1 text-sm font-medium transition"
        :class="!category
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
      >
        All
      </NuxtLink>
      <NuxtLink
        v-for="cat in sorted"
        :key="slug(cat)"
        :to="`/${slug(cat)}`"
        class="rounded-full px-3 py-1 text-sm font-medium transition"
        :class="category === slug(cat)
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
      >
        {{ cat.title }}
      </NuxtLink>
    </nav>

    <!-- Filtered view: single category -->
    <ul
      v-if="filtered"
      class="space-y-3"
    >
      <li
        v-for="project in filtered"
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

    <!-- Grouped view: umbrellas + other -->
    <template v-else>
      <ProjectGroup
        v-for="group in groups"
        :key="group.name"
        :name="group.name"
        :href="group.href"
        :description="group.description"
        :projects="group.projects"
      />
    </template>
  </div>
</template>
