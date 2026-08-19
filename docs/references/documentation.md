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

- El contenido se escribe en **castellano**.
- Excepción: el `README.md` va en **inglés** — es la puerta de entrada pública del repositorio.
- Las carpetas y los nombres de fichero van en **inglés y en kebab-case**.
- Los identificadores y fragmentos de código conservan su idioma original.

## Tono

- Frío y directo. Sin rodeos, sin justificaciones largas, sin adornos.
- Listas y tablas antes que párrafos. Un párrafo solo cuando una lista no puede expresarlo.
- Frases cortas. Cada frase aporta información o se elimina.
- La información más relevante de cada documento, en **negrita**.

## Contenido

- **Sin repetición: cada regla vive en un solo fichero.** `CLAUDE.md` solo enlaza, no duplica.
- Sin detalle extremo: **lo justo para actuar**. Se itera cuando hace falta.

## Mantenimiento

- **Quien cambia un comportamiento documentado actualiza el documento en el mismo cambio.** Documentación que contradice el código es peor que ninguna.

## Estructura

- **Un documento cubre un solo concepto.** Si al describirlo hace falta una «y», son dos documentos.
- Los documentos se agrupan en subcarpetas por contexto cuando aporta claridad.

| Correcto | Incorrecto |
|---|---|
| `docs/references/nuxt/pages.md` | `docs/references/nuxt.md` con todo Nuxt dentro |
| `docs/references/nuxt/routing.md` | `docs/references/pages-and-routing.md` |

## Registro en CLAUDE.md

- **Todo fichero nuevo en `docs/` se registra en `CLAUDE.md`**: los de `core/` con un import `@`, los de `references/` en la tabla.
- Los imports de `core/` van con `@ruta` a línea suelta: sin guiones ni texto introductorio, y en líneas consecutivas, sin líneas en blanco entre ellos. Cada fichero ya lleva su título.
- La tabla de `references/` tiene dos columnas: la ruta y una línea que dice cuándo consultar el fichero.

| Documento | Cuándo consultarlo |
|---|---|
| `docs/references/nuxt/pages.md` | Al crear o modificar páginas de Nuxt |

- **La descripción es el mecanismo de descubrimiento**: es lo único que un agente lee para decidir si abre el fichero. Una descripción vaga es un fichero que no se consulta nunca.
