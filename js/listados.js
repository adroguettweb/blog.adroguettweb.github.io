/**
 * js/listados.js
 * --------------
 * Este script lee la lista de ARTICULOS (definida en data/articulos.js)
 * y arma automáticamente:
 *   - el listado de "Recientes" en la portada (index.html)
 *   - el listado de una categoría (tutoriales.html, proyectos.html, etc.)
 *   - el archivo cronológico completo (archivo.html)
 *
 * Así, publicar un artículo nuevo es: agregar una entrada en articulos.js
 * y crear su archivo .html — NO hay que tocar estas páginas a mano.
 *
 * Cómo se usa: cada página de listado tiene un <div id="..."> vacío y,
 * antes de cerrar </body>, carga data/articulos.js y luego este archivo.
 * Ver el comentario al final de este archivo para el detalle de cada caso.
 */

/** Formatea "2026-08-20" como "20 de agosto de 2026" */
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO + "T00:00:00");
  return fecha.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Convierte una categoría a su slug de página: "Tutoriales" -> "tutoriales.html" */
function categoriaAPagina(categoria) {
  return categoria.toLowerCase() + ".html";
}

/** Genera el HTML de una fila de artículo (se reutiliza en todos los listados) */
function filaArticulo(articulo) {
  const tags = (articulo.tags || [])
    .map((tag) => `<li class="tag">${tag}</li>`)
    .join("");

  return `
    <article class="article-row">
      <div class="article-row__meta">
        <a href="${categoriaAPagina(articulo.categoria)}" class="article-row__category">${articulo.categoria}</a>
        <time datetime="${articulo.fecha}">${formatearFecha(articulo.fecha)}</time>
      </div>
      <h3 class="article-row__title">
        <a href="articulos/${articulo.archivo}">${articulo.titulo}</a>
      </h3>
      <p class="article-row__description">${articulo.descripcion}</p>
      ${tags ? `<ul class="tag-list">${tags}</ul>` : ""}
    </article>
  `;
}

/** Ordena artículos del más reciente al más antiguo */
function ordenarPorFechaDesc(lista) {
  return [...lista].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

/**
 * Pinta un listado de artículos dentro de un contenedor.
 * @param {string} idContenedor - id del <div> donde se inserta el listado
 * @param {Array} articulos - lista de artículos ya filtrada/ordenada
 * @param {string} mensajeVacio - texto a mostrar si la lista está vacía
 */
function pintarListado(idContenedor, articulos, mensajeVacio) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  if (articulos.length === 0) {
    contenedor.innerHTML = `<p class="empty-state">${mensajeVacio}</p>`;
    return;
  }

  contenedor.innerHTML = articulos.map(filaArticulo).join("");
}

/**
 * Pinta la página de Archivo, agrupando por año y mes.
 * @param {string} idContenedor - id del <div> donde se inserta el archivo
 */
function pintarArchivo(idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  const articulos = ordenarPorFechaDesc(ARTICULOS);

  if (articulos.length === 0) {
    contenedor.innerHTML = `<p class="empty-state">Todavía no hay artículos publicados.</p>`;
    return;
  }

  const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  // Agrupar por año -> mes -> lista
  const grupos = {};
  for (const art of articulos) {
    const fecha = new Date(art.fecha + "T00:00:00");
    const año = fecha.getUTCFullYear();
    const mes = MESES[fecha.getUTCMonth()];
    grupos[año] ??= {};
    grupos[año][mes] ??= [];
    grupos[año][mes].push(art);
  }

  const años = Object.keys(grupos).sort((a, b) => b - a);

  const html = años
    .map((año) => {
      const meses = Object.keys(grupos[año]).sort(
        (a, b) => MESES.indexOf(b) - MESES.indexOf(a)
      );

      const bloquesMes = meses
        .map((mes) => {
          const items = grupos[año][mes]
            .map(
              (art) => `
                <li>
                  <a href="articulos/${art.archivo}">${art.titulo}</a>
                  <span class="meta">${art.categoria} · ${formatearFecha(art.fecha)}</span>
                </li>
              `
            )
            .join("");

          return `
            <div class="archive-month">
              <h3>${mes}</h3>
              <ul>${items}</ul>
            </div>
          `;
        })
        .join("");

      return `
        <div class="archive-year">
          <h2>${año}</h2>
          ${bloquesMes}
        </div>
      `;
    })
    .join("");

  contenedor.innerHTML = html;
}

/* ────────────────────────────────────────────────────────────────
   CÓMO USAR ESTE ARCHIVO EN CADA PÁGINA
   ────────────────────────────────────────────────────────────────

   PORTADA (index.html) — muestra los 6 más recientes de TODAS las categorías:

     <div id="listado-recientes"></div>
     ...
     <script src="data/articulos.js"></script>
     <script src="js/listados.js"></script>
     <script>
       pintarListado(
         "listado-recientes",
         ordenarPorFechaDesc(ARTICULOS).slice(0, 6),
         "Todavía no hay artículos publicados. Vuelve pronto."
       );
     </script>

   PÁGINA DE CATEGORÍA (tutoriales.html, proyectos.html, etc.):

     <div id="listado-categoria"></div>
     ...
     <script src="data/articulos.js"></script>
     <script src="js/listados.js"></script>
     <script>
       const deEstaCategoria = ARTICULOS.filter(a => a.categoria === "Tutoriales");
       pintarListado(
         "listado-categoria",
         ordenarPorFechaDesc(deEstaCategoria),
         "Todavía no hay artículos en esta categoría."
       );
     </script>

   ARCHIVO (archivo.html):

     <div id="listado-archivo"></div>
     ...
     <script src="data/articulos.js"></script>
     <script src="js/listados.js"></script>
     <script>
       pintarArchivo("listado-archivo");
     </script>
   ──────────────────────────────────────────────────────────────── */
