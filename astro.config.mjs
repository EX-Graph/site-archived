import { defineConfig } from "astro/config";
import deno from "@astrojs/deno";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://ex-graph.deno.dev",
  output: "server",
  adapter: deno(),
  integrations: [tailwind(), svelte(), mdx(), react()],
  experimental: {
    viewTransitions: true,
  },
});
