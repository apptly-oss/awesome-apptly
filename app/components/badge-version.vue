<script setup lang="ts">
const props = defineProps<{
  src: string
  href: string
  alt: string
  title: string
}>();

const badge = ref<HTMLImageElement>();
const loaded = ref(false);
const error = ref(false);

// Handle image already loaded or errored before hydration
onMounted(() => {
  const element = badge.value;
  if (element?.complete) {
    if (element.naturalWidth > 0) {
      loaded.value = true;
    } else {
      error.value = true;
    }
  }
});

watch(() => props.src, () => {
  loaded.value = false;
  error.value = false;
});
</script>

<template>
  <a
    :href="href"
    :title="title"
    target="_blank"
    rel="noopener"
    class="inline-flex items-center leading-none"
  >
    <span
      v-if="!loaded && !error"
      class="badge-version-skeleton"
    />
    <span
      v-if="error"
      class="text-xs text-gray-400"
    >
      {{ alt }}
    </span>
    <img
      v-show="loaded"
      ref="badge"
      :src="src"
      :alt="alt"
      class="badge-version-img"
      @load="loaded = true"
      @error="error = true"
    >
  </a>
</template>

<style scoped>
.badge-version-img {
  height: 20px;
  margin: 0;
}

.badge-version-skeleton {
  display: inline-block;
  width: 72px;
  height: 20px;
  border-radius: 3px;
  background: #e5e7eb;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
