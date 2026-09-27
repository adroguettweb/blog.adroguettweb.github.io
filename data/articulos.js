/**
 * data/articulos.js
 * ------------------
 * Este archivo es el ÚNICO lugar donde registras tus artículos.
 * Cada vez que publiques uno nuevo, agrega un objeto más a esta lista.
 *
 * Las páginas de inicio, categorías y archivo LEEN esta lista automáticamente
 * (ver js/listados.js) para armar sus tablas de contenido — no necesitas
 * editarlas a mano.
 *
 * Campos de cada artículo:
 *   titulo      -> el título tal cual se muestra
 *   descripcion -> una o dos frases, se usa en listados y en <meta description>
 *   categoria   -> debe ser EXACTAMENTE una de: "Tutoriales", "Proyectos",
 *                  "Investigaciones", "Notas" (o una nueva que agregues, ver README)
 *   fecha       -> formato "AAAA-MM-DD"
 *   tags        -> lista de palabras clave (puede ir vacía: [])
 *   archivo     -> el nombre del .html dentro de la carpeta articulos/
 *                  (sin la carpeta, solo el nombre de archivo)
 */

const ARTICULOS = [
  // Ejemplo — bórralo o edítalo cuando publiques tu primer artículo real.
  // {
  //   titulo: "Introducción a las window functions en SQL",
  //   descripcion: "Qué son las funciones de ventana y cuándo usarlas.",
  //   categoria: "Tutoriales",
  //   fecha: "2026-08-20",
  //   tags: ["SQL", "bases de datos"],
  //   archivo: "introduccion-window-functions-sql.html",
  // },
];
