// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Este repo (blog.adroguettweb.github.io) se sirve en la RAÍZ del dominio,
  // no en una subcarpeta — por eso NO se usa "base" aquí. Si "base" está
  // presente, Astro genera todas las rutas (CSS, JS, enlaces) con un prefijo
  // que no existe en la URL real, y el navegador recibe 404 en todo.
  site: "https://blog.adroguettweb.github.io",

  integrations: [sitemap()],

  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
      wrap: true,
    },
  },
});
