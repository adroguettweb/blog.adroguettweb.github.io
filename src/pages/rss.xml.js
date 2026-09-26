// rss.xml.js
// Genera el feed RSS en /rss.xml a partir de todos los artículos publicados.
// Astro construye este archivo automáticamente al compilar el sitio.

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("posts", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: "adroguett.",
    description:
      "Un archivo personal sobre datos, programación, automatización y tecnología.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/articulo/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>es-cl</language>`,
  });
}
