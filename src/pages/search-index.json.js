// search-index.json.js
// Genera un archivo JSON estático con los datos mínimos de cada artículo
// (título, descripción, categoría, tags, url). El buscador del sitio (search.js)
// descarga este archivo UNA vez y filtra en el navegador: sin backend, sin base de datos.

import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  const index = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    category: post.data.category,
    tags: post.data.tags,
    url: `${import.meta.env.BASE_URL}articulo/${post.id}/`,
  }));

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
}
