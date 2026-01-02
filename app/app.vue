<script setup lang="ts">
import { useHead } from "nuxt/app";

useHead({
  link: [
    {
      href: "https://fonts.gstatic.com",
      rel: "preconnect",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Nunito+Sans",
      rel: "stylesheet",
    },
  ],
});
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
