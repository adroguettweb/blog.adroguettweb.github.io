# blog.adroguett

Blog personal construido con **Astro + Markdown**, preparado para publicarse mediante **GitHub Pages**.

## Publicarlo directamente en GitHub

El proyecto está preparado suponiendo que el repositorio se llama:

`blog-adroguett`

y que tu usuario de GitHub es:

`adroguett`

Con eso, el sitio queda en:

`https://adroguett.github.io/blog-adroguett/`

El despliegue está automatizado con `.github/workflows/deploy.yml`.

### 1. Crear el repositorio

Crea en GitHub un repositorio llamado `blog-adroguett`.

No necesitas crear manualmente una carpeta `dist/`.

### 2. Subir este proyecto

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Initial blog"
git branch -M main
git remote add origin https://github.com/adroguett/blog-adroguett.git
git push -u origin main
```

GitHub Actions instalará las dependencias, ejecutará Astro y publicará `dist/`.

### 3. Activar GitHub Pages

En el repositorio:

`Settings → Pages → Source → GitHub Actions`

Después de hacer `push`, revisa `Actions`. El workflow **Publicar blog en GitHub Pages** hará el despliegue.

### Si el repositorio tiene otro nombre

Edita solamente `astro.config.mjs`:

```js
site: "https://adroguett.github.io/NOMBRE-DEL-REPOSITORIO",
base: "/NOMBRE-DEL-REPOSITORIO",
```

Cuando tengas `blog.adroguett.com`, se puede cambiar la configuración para usar el dominio directamente.

---

## Diseño

La versión actual utiliza un tema claro, minimalista y editorial:

- fondo claro con superficies blancas
- azul como color de acento
- tipografía Sora + JetBrains Mono
- portada visual
- tarjetas de categorías
- artículos como bloques editoriales
- buscador
- navegación responsive
- bloques de código destacados
- RSS
- SEO básico
- sitemap
- despliegue automático con GitHub Actions

La identidad visual está separada del contenido: **los artículos siguen siendo Markdown**. No necesitas modificar HTML o CSS para publicar un artículo nuevo.

---


Este documento explica, en lenguaje simple, cómo está armado el blog y cómo
hacer las tareas del día a día: publicar un artículo, agregar imágenes, cambiar
colores, modificar el menú y publicar el sitio online.

No necesitas aprender HTML/CSS/JavaScript a fondo. Con lo que hay aquí te
alcanza para mantener el blog tú mismo.

---

## 1. ¿Qué es Astro y por qué se usó?

Astro es un generador de sitios estáticos: tú escribes contenido y páginas, y
Astro genera archivos HTML/CSS normales que cualquier navegador puede leer, sin
necesitar un servidor complejo ni una base de datos. Eso significa:

- El sitio es **rápido** (no hay JavaScript pesado corriendo en el navegador).
- Es **barato de alojar** (se puede hospedar gratis en servicios como Netlify,
  Vercel o GitHub Pages).
- Tus artículos son **archivos de texto** (`.md`) que puedes leer, editar y
  respaldar durante años, sin depender de ninguna plataforma.

No se usó React, Vue ni Angular, tal como pediste: solo Astro, HTML, CSS y un
poco de JavaScript simple donde hacía falta (el menú móvil y el buscador).

---

## 2. Estructura del proyecto

```
blog-adroguett/
├── astro.config.mjs          # configuración general del sitio (dominio, plugins)
├── src/
│   ├── content.config.ts     # define qué campos debe tener cada artículo
│   ├── content/
│   │   └── posts/            # AQUÍ VAN TUS ARTÍCULOS (.md)
│   ├── layouts/               # plantillas de página (base, artículo, categoría)
│   ├── components/            # piezas reutilizables (menú, pie de página, buscador)
│   ├── pages/                  # cada archivo aquí = una URL del sitio
│   │   ├── index.astro         # página de inicio (/)
│   │   ├── archivo/            # /archivo/
│   │   ├── articulo/[slug].astro  # genera /articulo/nombre-del-post/
│   │   ├── tag/[tag].astro     # genera /tag/nombre-del-tag/
│   │   ├── tutoriales/         # /tutoriales/
│   │   ├── proyectos/          # /proyectos/
│   │   ├── investigaciones/    # /investigaciones/
│   │   ├── notas/              # /notas/
│   │   ├── rss.xml.js          # genera el feed RSS
│   │   └── search-index.json.js # datos para el buscador
│   ├── styles/global.css       # TODOS los colores y estilos generales
│   └── lib/utils.ts            # funciones pequeñas de apoyo (fechas, etc.)
└── public/
    ├── images/                 # AQUÍ VAN TUS IMÁGENES
    ├── favicon.svg
    └── robots.txt
```

La regla general de Astro: **cada archivo dentro de `src/pages/` se convierte
en una URL**. Por ejemplo, `src/pages/archivo/index.astro` se convierte en
`tudominio.com/archivo/`.

---

## 3. Cómo agregar un nuevo artículo

1. Ve a la carpeta `src/content/posts/`.
2. Crea un archivo nuevo con extensión `.md`. El nombre del archivo define la
   URL del artículo, así que usa minúsculas, sin espacios ni tildes, separado
   por guiones. Ejemplo: `mi-nuevo-tutorial-de-pandas.md`.
3. Al inicio del archivo, pega este bloque (se llama "frontmatter") y
   complétalo:

```markdown
---
title: "Título de tu artículo"
description: "Una o dos frases que resumen de qué trata."
category: "Tutoriales"
date: 2026-09-06
tags: ["Python", "pandas"]
draft: false
---

Aquí empieza el contenido del artículo, en Markdown normal.
```

- **category** debe ser exactamente una de estas cuatro: `Tutoriales`,
  `Proyectos`, `Investigaciones`, `Notas` (con mayúscula inicial).
- **date** en formato `AAAA-MM-DD`.
- **tags** es una lista de palabras clave; puedes poner las que quieras.
- **draft**: si lo pones en `true`, el artículo NO se publica (útil para
  guardar borradores a medio escribir). Cuando esté listo, cámbialo a `false`.

4. Escribe el contenido debajo del segundo `---`, usando Markdown normal:

```markdown
## Un subtítulo

Un párrafo normal.

- Un ítem de lista
- Otro ítem

​```python
print("un bloque de código")
​```

> Una cita
```

5. Guarda el archivo. Eso es todo — no hay que registrar el artículo en
   ningún otro lado. Astro lo detecta automáticamente y aparece en:
   - La página de inicio (si es reciente)
   - Su página de categoría
   - La página `/archivo/`
   - El feed RSS
   - El buscador

### Cómo agregar una nueva categoría en el futuro

Si más adelante quieres una quinta categoría (por ejemplo "Reseñas"):

1. Abre `src/content.config.ts` y agrega el nombre nuevo a la lista de
   categorías permitidas (la línea que dice
   `z.enum(["Tutoriales", "Proyectos", "Investigaciones", "Notas"])`).
2. Crea una carpeta `src/pages/resenas/` con un archivo `index.astro` (puedes
   copiar y adaptar cualquiera de las páginas de categoría existentes, como
   `src/pages/notas/index.astro`, cambiando el nombre de categoría).
3. Agrega el enlace en el menú (ver sección 6).

---

## 4. Cómo agregar imágenes

1. Copia tu imagen dentro de `public/images/`. Por ejemplo:
   `public/images/diagrama-pipeline.png`.
2. Dentro de tu artículo `.md`, insértala así:

```markdown
![Descripción de la imagen para accesibilidad](/images/diagrama-pipeline.png)
```

El texto entre corchetes (`[...]`) es el "texto alternativo": lo leen los
lectores de pantalla y aparece si la imagen no carga, así que descríbela
brevemente.

Las imágenes se adaptan automáticamente al ancho del artículo y no rompen el
diseño en móvil.

---

## 5. Parentesco visual con adroguett.com

Este blog es claro y adroguett.com (tu web de servicios) es oscura — son
intencionalmente "negativos" el uno del otro, no gemelos idénticos. Lo que
los hace parientes es que comparten:

- El mismo wordmark: "Alfonso Droguett." en JetBrains Mono, con el punto en
  el color de acento.
- La misma pareja tipográfica: **Sora** para texto normal, **JetBrains Mono**
  para todo lo "técnico" (categorías, tags, fechas, metadatos, código).
- El mismo azul de acento: `#3B82F6`.
- El mismo comportamiento de navbar: transparente arriba del todo, y con
  fondo translúcido + blur al hacer scroll.

Por ahora **los dos sitios todavía no están conectados en la práctica**: el
botón "Blog" en adroguett.com y el botón "Servicios" en este blog apuntan a
URLs que aún no existen en un dominio real (son provisorias, ver sección 12).
Cuando publiques ambos sitios con sus dominios finales, solo tienes que
actualizar esas dos URLs.

---

## 6. Cómo cambiar los colores

Todos los colores del sitio están centralizados en un solo archivo:
`src/styles/global.css`, en las primeras líneas (bloque `:root`):

```css
:root {
  --color-bg: #FAFAF8;              /* fondo general */
  --color-text: #111827;             /* texto principal */
  --color-text-secondary: #6B7280;   /* texto secundario (fechas, descripciones) */
  --color-accent: #3B82F6;           /* color de acento (enlaces, categorías) */
  --color-border: #E5E3DD;           /* líneas divisorias */
  --color-code-bg: #101418;          /* fondo de bloques de código */
}
```

Para cambiar cualquier color, edita el valor hexadecimal correspondiente. Por
ejemplo, si quieres que el acento sea verde en vez de azul, cambia
`--color-accent: #3B82F6;` por `--color-accent: #10B981;`. El cambio se aplica
en todo el sitio automáticamente (menú, enlaces, categorías, bordes al hacer
foco, etc.), porque todos los demás archivos usan esta variable en vez de
colores escritos directamente.

---

## 7. Cómo modificar el menú de navegación

El menú principal está en `src/components/Header.astro`, cerca del inicio del
archivo, en un bloque llamado `navLinks`:

```javascript
const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tutoriales/", label: "Tutoriales" },
  { href: "/proyectos/", label: "Proyectos" },
  { href: "/investigaciones/", label: "Investigaciones" },
  { href: "/notas/", label: "Notas" },
  { href: "/archivo/", label: "Archivo" },
];
```

Para agregar, quitar o renombrar un ítem del menú, edita esta lista:
- `href` es la URL a la que apunta.
- `label` es el texto visible.

El enlace "Servicios" (que apunta a tu web principal) está por separado, un
poco más abajo en el mismo archivo, dentro de `site-nav__external`, por si
quieres cambiar esa URL cuando pases de `adroguetth.github.io` a
`adroguett.com`.

---

## 8. El buscador

El buscador (arriba a la derecha en escritorio) funciona sin depender de
ningún servicio externo: al compilar el sitio, Astro genera un archivo
`search-index.json` con el título, descripción, categoría y tags de cada
artículo. Cuando escribes en el buscador, el navegador descarga ese archivo
una vez y filtra los resultados ahí mismo, en tu computador — no hay
servidores de búsqueda de terceros ni envío de datos a nadie.

Si en el futuro el archivo `search-index.json` se vuelve muy pesado (miles de
artículos), se puede migrar a un buscador más sofisticado, pero para cientos
de artículos esto funciona perfectamente bien y es la opción más simple.

---

## 9. RSS

El feed vive en `/rss.xml` y se genera automáticamente a partir de tus
artículos publicados (no incluye los que tengan `draft: true`). No necesitas
hacer nada manualmente: cada vez que publiques un artículo nuevo y vuelvas a
generar el sitio, el RSS se actualiza solo.

---

## 10. SEO

Cada página ya incluye automáticamente:

- `<title>` y meta descripción (tomados del `title` y `description` de cada
  artículo)
- URL canónica
- Etiquetas Open Graph (para que se vea bien al compartir en redes o Slack)
- `robots.txt` (en `public/robots.txt`)
- `sitemap-index.xml` (generado automáticamente por el plugin de sitemap)

No necesitas tocar nada de esto para cada artículo nuevo: se completa solo a
partir del `title` y `description` que pongas en el frontmatter.

---

## 11. Cómo previsualizar el sitio en tu computador

Necesitas tener [Node.js](https://nodejs.org) instalado (versión 22 o
superior). Luego, desde la carpeta del proyecto:

```bash
npm install       # solo la primera vez, instala las dependencias
npm run dev       # levanta el sitio en http://localhost:4321
```

Mientras `npm run dev` esté corriendo, cualquier cambio que guardes en un
artículo o archivo se refleja al instante en el navegador.

Para generar la versión final (los archivos que se suben a internet):

```bash
npm run build     # genera la carpeta dist/ con el sitio listo para publicar
npm run preview   # previsualiza esa versión final localmente
```

---

## 12. Cómo publicar el sitio (paso a paso)

La forma más simple y gratuita de publicar un sitio Astro es con **Netlify**
o **Vercel**, conectados a un repositorio de GitHub. Con cualquiera de las
dos, cada vez que subas cambios a GitHub, el sitio se actualiza solo.

### Paso 1: Subir el proyecto a GitHub

1. Crea un repositorio nuevo en GitHub (por ejemplo `blog-adroguett`).
2. Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Primer commit del blog"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/blog-adroguett.git
git push -u origin main
```

### Paso 2: Conectar con Netlify (recomendado por su simplicidad)

1. Entra a netlify.com y crea una cuenta gratuita (puedes usar tu cuenta de
   GitHub para entrar).
2. Click en "Add new site" → "Import an existing project".
3. Elige GitHub y selecciona el repositorio `blog-adroguett`.
4. Netlify detecta Astro automáticamente. Los valores por defecto deberían
   ser:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click en "Deploy". En un par de minutos tendrás una URL tipo
   `nombre-al-azar.netlify.app` con tu sitio funcionando.

### Paso 3: Conectar tu dominio `blog.adroguett.com`

Cuando tengas el dominio `adroguett.com` (o ya lo tengas):

1. En Netlify, ve a "Domain settings" → "Add a domain" y escribe
   `blog.adroguett.com`.
2. Netlify te dará un registro DNS (normalmente un `CNAME`) que debes agregar
   en el panel de administración de tu dominio (donde lo hayas comprado, ej.
   NIC Chile, GoDaddy, Namecheap).
3. El registro es algo como:

   | Tipo  | Nombre | Valor                          |
   |-------|--------|---------------------------------|
   | CNAME | blog   | nombre-al-azar.netlify.app      |

4. Después de unos minutos u horas (según el proveedor), `blog.adroguett.com`
   apuntará a tu blog. Netlify también activa HTTPS automáticamente y sin
   costo.

### Paso 4: actualizar astro.config.mjs

Una vez que el dominio esté funcionando, abre `astro.config.mjs` y confirma
que la línea `site:` diga exactamente tu dominio final:

```javascript
site: "https://blog.adroguett.com",
```

Esto es importante para que el sitemap, el RSS y las etiquetas Open Graph
usen la URL correcta.

### Alternativa: Vercel o GitHub Pages

El proceso con **Vercel** es prácticamente idéntico (importas el repo de
GitHub, detecta Astro automáticamente). **GitHub Pages** también es una
opción gratuita, aunque requiere un paso extra de configuración con GitHub
Actions; si te interesa esa ruta te puedo dejar la configuración lista aparte.

---

## 13. Vincular con adroguett.com

Ambos sitios ya están preparados para enlazarse, pero **todavía no están
conectados con dominios reales** — es un paso pendiente de tu lado cuando
tengas los dominios listos:

- En este blog, el botón "Servicios" del menú y el enlace del footer apuntan
  a `https://adroguetth.github.io/` (la URL provisoria de tu web principal).
- En adroguett.com (tu web de servicios), el botón "Blog" del navbar y el
  enlace del footer ya apuntan a `https://blog.adroguett.com`, aunque ese
  subdominio todavía no existe.

Cuando definas los dominios finales (por ejemplo `adroguett.cl` y
`blog.adroguett.cl`, o las variantes `.com`), solo tienes que:

1. En este blog: buscar `adroguetth.github.io` en `src/components/Header.astro`
   y `src/components/Footer.astro`, y reemplazarlo por la URL final de
   adroguett.com/.cl.
2. En adroguett.com: buscar `blog.adroguett.com` en `index.html` (aparece en
   el navbar y en el footer) y reemplazarlo por la URL final del blog.
3. Publicar ambos sitios (ver sección 12) y configurar los registros DNS de
   cada dominio.

---

## 14. Resumen de la filosofía técnica

- Cada artículo es un archivo de texto plano (`.md`) que te pertenece a ti,
  no a ninguna plataforma. Puedes copiarlos, respaldarlos, moverlos.
- No hay trackers, analíticas de terceros, ni scripts de publicidad.
- El único JavaScript del sitio es: abrir/cerrar el menú en móvil, y el
  buscador local. Nada más.
- El diseño prioriza la lectura por sobre el espectáculo visual: ancho de
  columna limitado, tipografía legible, sin animaciones innecesarias.

Este es un archivo pensado para durar. Dentro de 10 años, mientras conserves
estos archivos de texto, podrás volver a generar el sitio completo con
`npm install && npm run build`, sin depender de ningún servicio que pueda
desaparecer.
