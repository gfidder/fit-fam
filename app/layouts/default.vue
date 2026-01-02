<script setup lang="ts">
const _route = useRoute();

const subNavigation = ref([
  {
    id: "index",
    link: "/",
    label: "Dashboard",
    current: false,
  },
  {
    id: "data-entry",
    link: "/data-entry",
    label: "Data Entry",
    current: false,
  },
  {
    id: "charts",
    link: "/charts",
    label: "Charts",
    current: false,
  },
  {
    id: "goals",
    link: "/goals",
    label: "Goals",
    current: false,
  },
]);

onMounted(() => {
  const hasTrailing = useRoute().name?.toString().endsWith("/");
  const currentPageMatch = useRoute()
    .name?.toString()
    .slice(0, hasTrailing ? -1 : useRoute().name?.toString().length);

  // console.log(currentPageMatch);

  subNavigation.value.forEach((page) => {
    if (currentPageMatch?.includes(page.id.toLowerCase())) {
      page.current = true;
    } else {
      page.current = false;
    }
  });
});
</script>

<template>
  <html lang="en">
    <body class="gradient-purple min-h-screen p-5">
      <div
        class="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div class="gradient-blue p-8 text-center text-white">
          <h1 class="mb-2 text-5xl font-light">Family Weight Loss Tracker</h1>
          <p class="text-lg opacity-90">
            Track progress, stay motivated, achieve goals together
          </p>
        </div>
        <div class="flex border-b border-gray-200 bg-gray-100">
          <NuxtLink
            v-for="item in subNavigation"
            :key="item.id"
            :to="item.link"
            :aria-current="item.current ? 'page' : false"
            :class="[
              item.current
                ? 'border-b-4 border-blue-400 bg-white text-blue-400'
                : 'bg-transparent text-gray-600 hover:bg-gray-200',
              'flex-1 px-5 py-4 font-medium transition-all',
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
        <slot />
      </div>
    </body>
  </html>
</template>
