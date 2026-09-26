// src/lib/utils.ts
//
// Funciones pequeñas que se reutilizan en varias páginas.

/** Formatea una fecha como "5 de septiembre de 2026" */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Calcula minutos de lectura estimados a partir de un texto plano (~200 palabras/min) */
export function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Convierte "Tutoriales" -> "tutoriales" para armar URLs de categoría */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos
}

/** Convierte un tag como "análisis de datos" -> "analisis-de-datos" para usarlo en una URL */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/\s+/g, "-"); // espacios -> guiones
}
