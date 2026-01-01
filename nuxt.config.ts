import eslintPlugin from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@nuxt/devtools",
    "@nuxt/eslint",
  ],
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: ".",
        paths: {
          "~/*": ["./*"],
        },
      },
      files: ["prisma.config.ts"],
    },
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
  css: ["./app/assets/global.css"],
  vite: {
    plugins: [eslintPlugin(), tailwindcss()],
  },
  colorMode: {
    classSuffix: "",
  },
  // nitro: {
  //   preset: "vercel",
  // },
  devtools: {
    timeline: {
      enabled: true,
    },
  },
});
