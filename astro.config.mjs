import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://cubillagigante.github.io",
  base: "portfolio",
  integrations: [tailwind(), icon(), vue()]
});
