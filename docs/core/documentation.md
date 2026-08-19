# Cómo documentar el proyecto

Reglas para escribir la documentación de este proyecto. Aplican a agentes y a usuarios por igual.

## Niveles

| Nivel | Ruta | Carga | Contenido |
|---|---|---|---|
| Obligatoria | `docs/core/` | Siempre presente en el contexto de los agentes | Lo que hay que saber para trabajar en el proyecto |
| Puntual | `docs/references/` | Descubrimiento progresivo, solo cuando se necesita | Detalle de conceptos concretos |

- Antes de añadir algo a `docs/core/`, comprobar que de verdad hace falta en todo momento: cada línea ocupa contexto en cada sesión.
- Lo que solo se necesita a veces va a `docs/references/`.

## Idioma

- Toda la documentación se escribe en castellano.
- Los identificadores, rutas y fragmentos de código conservan su idioma original.

## Tono

- Frío y directo. Sin rodeos, sin justificaciones largas, sin adornos.
- Listas y tablas antes que párrafos. Un párrafo solo cuando una lista no puede expresarlo.
- Frases cortas. Cada frase aporta información o se elimina.

## Estructura

- Un documento cubre un solo concepto. Si al describirlo hace falta una «y», son dos documentos.
- Los documentos se agrupan en subcarpetas por contexto cuando aporta claridad.

| Correcto | Incorrecto |
|---|---|
| `docs/references/nuxt/pages.md` | `docs/references/nuxt.md` con todo Nuxt dentro |
| `docs/references/nuxt/routing.md` | `docs/references/pages-and-routing.md` |
