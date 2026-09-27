# blog.adroguett — HTML/CSS/JS puro

Este blog está hecho en HTML, CSS y JavaScript simple, sin ningún paso de
build. Subes los archivos tal cual a GitHub y el sitio funciona — no hay
`npm run build`, no hay Actions, no hay nada que pueda desalinearse entre
"lo que compilé" y "lo que se publica".

---

## 1. Estructura del proyecto

```
blog-html/
├── index.html            # portada
├── tutoriales.html        # listado de la categoría Tutoriales
├── proyectos.html         # listado de la categoría Proyectos
├── investigaciones.html   # listado de la categoría Investigaciones
├── notas.html              # listado de la categoría Notas
├── archivo.html            # todos los artículos, cronológico
├── robots.txt
├── sitemap.xml             # se edita a mano (ver sección 8)
├── rss.xml                 # se edita a mano (ver sección 8)
├── favicon.svg
│
├── data/
│   └── articulos.js         # ← EL ÚNICO LUGAR donde registras tus artículos
│
├── articulos/
│   ├── _plantilla.html       # cópiala para cada artículo nuevo
│   └── (tus artículos reales van aquí)
│
├── css/
│   └── estilos.css           # todos los estilos del sitio, un solo archivo
│
├── js/
│   ├── header.js              # menú móvil + efecto de scroll del header
│   └── listados.js            # arma los listados automáticamente
│
└── images/
    └── (tus imágenes van aquí)
```

---

## 2. Cómo funciona la parte "automática"

No hay build, pero sí hay **un archivo central de datos**:
`data/articulos.js`. Ahí guardas título, descripción, categoría, fecha, tags
y el nombre del archivo de cada artículo.

Las páginas de listado (`index.html`, las 4 categorías, `archivo.html`)
cargan ese archivo con una etiqueta `<script>` y usan `js/listados.js` para
armar la lista **en el navegador**, cada vez que alguien visita la página.
Por eso no necesitas editar esas páginas a mano cuando agregas un artículo:
solo agregas una entrada en `articulos.js` y el listado se actualiza solo.

Esto es JavaScript mínimo (dos archivos pequeños, sin librerías externas) —
el resto del sitio es HTML y CSS normales.

---

## 3. Cómo publicar un artículo nuevo (paso a paso)

1. **Copia la plantilla**: duplica `articulos/_plantilla.html` y ponle un
   nombre nuevo, en minúsculas y con guiones, por ejemplo:
   `articulos/mi-nuevo-tutorial.html`.

2. **Edita el archivo copiado**: dentro hay 6 partes marcadas con el
   comentario `[EDITAR]` — título, descripción, categoría, fecha, y la URL
   canónica. Complétalas.

3. **Escribe el contenido** dentro de `<div class="article-body">`, usando
   HTML normal: `<h2>` para subtítulos, `<p>` para párrafos, `<pre><code>`
   para bloques de código, `<img>` para imágenes, etc.

4. **Registra el artículo en `data/articulos.js`**: agrega un objeto nuevo
   a la lista `ARTICULOS`, con los mismos datos que pusiste en el HTML:

```javascript
{
  titulo: "Mi nuevo tutorial",
  descripcion: "De qué trata en una frase.",
  categoria: "Tutoriales",
  fecha: "2026-09-26",
  tags: ["Python", "pandas"],
  archivo: "mi-nuevo-tutorial.html",
},
```

5. **Guarda, sube a GitHub, listo.** Aparece automáticamente en la portada
   (si es reciente), en su página de categoría, y en el archivo cronológico.

6. *(Opcional, para SEO/RSS)*: agrega también una entrada en `sitemap.xml` y
   `rss.xml` — ver sección 8. No es obligatorio para que el sitio funcione,
   solo ayuda a que Google y los lectores RSS lo encuentren más rápido.

---

## 4. Cómo agregar imágenes

1. Copia tu imagen dentro de `images/` (en la raíz del proyecto).
2. Desde un artículo (que vive dentro de `articulos/`), referénciala con
   `../` al inicio, porque el artículo está un nivel más adentro que la
   carpeta `images/`:

```html
<img src="../images/mi-imagen.png" alt="Descripción de la imagen">
```

El atributo `alt` es el texto alternativo — descríbelo brevemente, ayuda a
la accesibilidad y al SEO.

---

## 5. Cómo cambiar los colores

Todo el sistema de color vive en `css/estilos.css`, en las primeras líneas
(bloque `:root`):

```css
:root {
  --color-bg: #FAFAF8;
  --color-text: #111827;
  --color-text-secondary: #6B7280;
  --color-accent: #3B82F6;
  --color-border: #E5E3DD;
  --color-code-bg: #101418;
}
```

Cambia el valor hexadecimal que quieras — el cambio se aplica en todo el
sitio, porque todas las páginas usan el mismo archivo `css/estilos.css`.

---

## 6. Cómo modificar el menú de navegación

El menú se repite igual en todas las páginas (`index.html`, las 4
categorías, `archivo.html`, y en `articulos/_plantilla.html` con rutas
`../`). Para agregar/quitar/renombrar un ítem, busca este bloque en cada
archivo y edítalo:

```html
<nav id="site-nav" class="site-nav">
  <ul>
    <li><a href="index.html">Inicio</a></li>
    <li><a href="tutoriales.html">Tutoriales</a></li>
    ...
  </ul>
</nav>
```

Como no hay build, este es el único caso donde SÍ tienes que repetir el
cambio en cada archivo HTML (son 7 en total). Si en el futuro esto se
vuelve tedioso, se puede resolver con un pequeño script que inserte el
header automáticamente — pero para 7 archivos, editar a mano es más simple
que la complejidad de automatizarlo.

---

## 7. Cómo agregar una nueva categoría

1. Copia una de las páginas de categoría existentes (ej. `notas.html`) y
   renómbrala (ej. `resenas.html`).
2. Dentro, cambia el `<title>`, la descripción, y la línea:
   ```javascript
   const deEstaCategoria = ARTICULOS.filter(a => a.categoria === "Notas");
   ```
   por el nombre de tu nueva categoría.
3. Agrega el enlace en el menú de navegación de todas las páginas (ver
   sección 6) y en la grilla de categorías de `index.html`.
4. Usa ese mismo nombre de categoría en `data/articulos.js` al registrar
   artículos de esa categoría.

---

## 8. SEO, sitemap y RSS (manuales)

Como no hay build, `sitemap.xml` y `rss.xml` no se regeneran solos. Cada
uno tiene un comentario adentro explicando qué bloque copiar y pegar cuando
publiques un artículo nuevo. Es opcional: el sitio funciona igual sin
mantenerlos actualizados, pero ayuda a que Google indexe tus artículos y a
que la gente pueda suscribirse por RSS.

Cada página ya incluye por su cuenta: `<title>`, meta descripción, URL
canónica, y etiquetas Open Graph — eso sí se completa por artículo, dentro
de su propio HTML (ver sección 3, paso 2).

---

## 9. Cómo previsualizar el sitio en tu computador

No necesitas instalar nada para ver el sitio: puedes abrir `index.html`
directamente con doble clic y se ve en el navegador. Los enlaces entre
páginas funcionan igual, porque todas las rutas son relativas.

Si prefieres simular exactamente cómo se ve en internet (recomendado antes
de publicar cambios grandes), y tienes Python instalado:

```bash
cd blog-html
python3 -m http.server 8080
```

Y abre `http://localhost:8080` en el navegador.

---

## 10. Cómo publicar el sitio

Como ya tienes el repo `blog.adroguettweb.github.io` en GitHub Pages:

1. Borra el contenido actual del repo (el que compilaba con Astro).
2. Sube el contenido completo de esta carpeta (`index.html`, `css/`, `js/`,
   `data/`, `articulos/`, `images/`, `robots.txt`, `sitemap.xml`, `rss.xml`,
   `favicon.svg`) directamente a la raíz del repo.
3. En **Settings → Pages → Source**, elige **"Deploy from a branch"** (ya
   no necesitas "GitHub Actions", porque no hay nada que compilar) →
   rama `main`, carpeta `/ (root)`.
4. Espera 1-2 minutos y entra a `https://blog.adroguettweb.github.io`.

Cada vez que quieras publicar un cambio, simplemente subes los archivos
modificados — no hay ningún paso intermedio.

---

## 11. Por qué este enfoque y no Astro

Astro + Markdown generaba el sitio automáticamente a partir de archivos
`.md`, lo cual era más cómodo para escribir. Pero el paso de build (Astro
→ HTML) agregaba una capa extra que resultó difícil de depurar en GitHub
Pages (configuración de rutas, GitHub Actions, caché).

Este enfoque HTML/CSS/JS elimina esa capa: lo que subes es exactamente lo
que se publica, sin traducción en el medio. A cambio, publicar un artículo
requiere copiar una plantilla HTML en vez de escribir Markdown puro — un
poco más de trabajo por artículo, pero con un sistema mucho más simple de
razonar y depurar si algo falla.
