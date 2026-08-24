# Artículos

Qué es un artículo y qué contrato editorial debe cumplir.

## Definición

- **Un artículo es una pieza editorial independiente sobre cómo se construye y evoluciona Try and Catch.**
- Puede explicar desde un cambio de un solo commit hasta varias versiones.
- Puede tratar un tema sin relación con una versión, como producto o plataforma.
- No es un tutorial ni necesita estar vinculado a una release.
- La aplicación cuenta el relato en primera persona. Pau Casanellas firma el artículo.

## Formato

- Un fichero Markdown por artículo en `content/<locale>/articles/<slug>.md`.
- El nombre del fichero es kebab-case.
- El slug se deriva del nombre del fichero. No se declara en el frontmatter.
- La ruta en castellano es `/articulos/<slug>`.
- El cuerpo contiene el relato y admite Markdown y componentes MDC.
- Los enlaces a issues, pull requests, commits, diffs o cualquier otra referencia viven en el cuerpo. No tienen un campo propio.
- `Decisiones tomadas` y `Decisiones descartadas` son secciones opcionales del cuerpo.
- No existe estado de borrador: si el artículo está en el código publicado, aparece en la web.

## Frontmatter

**Todos los campos son obligatorios.**

| Campo | Tipo | Regla |
|---|---|---|
| `title` | `string` | Título visible del artículo |
| `description` | `string` | Resumen para listados y metadatos |
| `publishedAt` | `date` | Fecha de publicación en formato `YYYY-MM-DD` |
| `readingTime` | `number` | Minutos de lectura, escritos manualmente como entero positivo |
| `author` | `string` | Siempre `Pau Casanellas` |
| `categories` | `string[]` | Una o más categorías válidas, sin duplicados |
| `image.src` | `string` | Ruta de la imagen de portada |
| `image.alt` | `string` | Descripción accesible de la portada |

```yaml
---
title: Definir qué es un artículo
description: El contrato editorial y técnico de los artículos de Try and Catch.
publishedAt: 2026-08-25
readingTime: 5
author: Pau Casanellas
categories:
  - producto
  - frontend
image:
  src: /images/articles/definir-un-articulo.webp
  alt: Un documento Markdown con el contrato de un artículo
---
```

## Categorías

**La lista es cerrada.**

| Valor | Uso |
|---|---|
| `producto` | Concepto, alcance y decisiones de producto |
| `frontend` | Interfaz, experiencia y código ejecutado en el cliente |

- Un artículo puede pertenecer a varias categorías.
- Añadir una categoría exige ampliar explícitamente esta lista y el schema que valide los artículos en el mismo cambio.

## Contenido no almacenado

| Dato | Motivo |
|---|---|
| `slug` | Se deriva del nombre del fichero |
| `version` | Un artículo puede abarcar ninguna, una o varias versiones |
| Referencias técnicas | Se integran en el relato del cuerpo |
| `draft` | La publicación depende de que el fichero llegue a la web |
| `updatedAt` | No existe una necesidad editorial actual |

- `readingTime` se mantiene manualmente. Su cálculo automático requiere cambiar este contrato.
