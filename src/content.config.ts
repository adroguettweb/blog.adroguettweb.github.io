// src/content.config.ts
//
// Aquí se define la "forma" que debe tener cada artículo (post).
// Astro lee todos los archivos .md dentro de src/content/posts/
// y valida que cada uno tenga estos campos en su frontmatter (el bloque --- de arriba).
//
// Si a un artículo le falta un campo obligatorio, o pone un tipo de dato incorrecto
// (por ejemplo, una fecha mal escrita), Astro te avisará con un error claro al compilar.

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  // "glob" le dice a Astro: "busca todos los .md y .mdx dentro de esta carpeta"
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Categoría: una de estas cuatro. Para agregar una categoría nueva,
    // solo hay que añadirla a esta lista (ver README para más detalle).
    category: z.enum(["Tutoriales", "Proyectos", "Investigaciones", "Notas"]),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Si un artículo está a medio escribir, puedes marcarlo como borrador
    // y no aparecerá publicado en el sitio.
    draft: z.boolean().default(false),
    // Tiempo estimado de lectura en minutos. Es opcional: si no lo escribes,
    // el sitio lo calcula automáticamente contando palabras.
    readingTime: z.number().optional(),
  }),
});

export const collections = { posts };
