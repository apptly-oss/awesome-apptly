export async function useCategories() {
  const { data: all } = await useAsyncData(() => 'categories', () => {
    return queryCollection('categories')
      .order('stem', 'ASC')
      .all();
  });

  // Umbrella categories (have org) come first, then the rest.
  const sorted = computed(() => {
    if (!all.value) return [];
    const umbrellas = all.value.filter((c) => c.org);
    const rest = all.value.filter((c) => !c.org);
    return [...umbrellas, ...rest];
  });

  function slug(c: NonNullable<typeof all.value>[number]): string {
    return c.stem?.replace('categories/', '') ?? '';
  }

  function isUmbrella(c: NonNullable<typeof all.value>[number]): boolean {
    return !!c.org;
  }

  const umbrellaSlugs = computed(() =>
    sorted.value.filter((c) => c.org).map((c) => slug(c)));

  function find(name: string) {
    return all.value?.find((c) => slug(c) === name) ?? undefined;
  }

  function isValid(name: string): boolean {
    return name === OTHER_SLUG || !!all.value?.some((c) => slug(c) === name);
  }

  function isUnderUmbrella(categories: string[]): boolean {
    return umbrellaSlugs.value.some((u) => categories.includes(u));
  }

  return { all, sorted, slug, isUmbrella, umbrellaSlugs, find, isValid, isUnderUmbrella };
}
