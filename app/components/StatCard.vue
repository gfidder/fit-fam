<script setup lang="ts">
interface Props {
  title: string;
  value: string;
  subtext: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="gradient-purple rounded-xl p-6 text-center text-white">
    <h3 class="mb-2 text-sm tracking-wide uppercase opacity-80">
      {{ props.title }}
    </h3>
    <p class="mb-1 text-4xl font-bold">{{ props.value }}</p>
    <p class="text-sm opacity-70">{{ props.subtext }}</p>
  </div>
</template>
