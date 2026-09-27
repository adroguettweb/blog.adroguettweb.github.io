/**
 * js/header.js
 * ------------
 * Dos cosas nada más:
 * 1. Abre/cierra el menú en móvil al tocar el botón de hamburguesa.
 * 2. Aplica fondo translúcido + blur al header cuando haces scroll.
 * Se incluye en TODAS las páginas justo antes de </body>.
 */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  const header = document.getElementById("site-header");

  toggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});
