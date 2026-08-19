# Páginas y componentes

Convención de organización. Documento incremental: lo que no esté aquí (stores…) aún no tiene convención fijada.

## Páginas

- **Una página es siempre un hub: solo el listado de sus secciones**, visible de un vistazo. Ningún detalle de UI inline: el detalle se empuja siempre hacia componentes más profundos.
- El root de toda página es `UPage` (ver `ui.md`).
- La columna (ancho, gutter) la ponen las secciones de Nuxt UI (`UPageHero`, `UPageSection`…) dentro de `UPage`; el layout no añade `UContainer` y las páginas nunca repiten wrappers de `max-w`/`px`.
- Carpeta por página: `pages/<pagina>/index.vue`. Las sub-rutas se separan pronto en su propio fichero (`pages/blog/index.vue` + `pages/blog/[slug].vue`).
- Cada página define `useHead` con su `title` vía i18n (ver `i18n.md`).

## Componentes

- Los componentes reciben `props` tipadas y no acceden a estado global ni a rutas: eso es de la página.
- En los SFC, `<template>` siempre arriba y `<script>` abajo.
- **Regla de 100 líneas**: cuando un componente supera ~100 líneas, plantear separarlo en subcomponentes. Un componente grande se convierte a su vez en hub de subcomponentes en su subcarpeta: `home/hero/HomeHero.vue` como hub y `HomeHero*.vue` como piezas.
- El primer nivel de `components/` es el contexto:
  - `components/app/` — lo que se repite por todo el proyecto sin contexto propio (`AppHeader`, `AppFooter`).
  - `components/<contexto>/` (ejemplo: `blog/`) — componentes de un dominio; pueden repetirse pero pertenecen claramente al contexto (`BlogListItem`).
  - `components/<pagina>/` (ejemplo: `home/`) — exclusivos de una página.
- Subcarpeta por cada subsección, anidando: `components/app/header/AppHeader.vue`; dentro del header, `components/app/header/navigation/AppHeaderNavigation.vue`.
- El nombre del componente es la cadena completa de carpetas en PascalCase: `app/header/navigation/` → `AppHeaderNavigation`. Con `pathPrefix: false`, el nombre global es exactamente el del fichero.
- `components/<contexto>/shared/` guarda lo compartido dentro del contexto; su nombre cuelga directamente del root: `blog/shared/BlogBackButton.vue` → `BlogBackButton`, nunca `BlogSharedBackButton`.
