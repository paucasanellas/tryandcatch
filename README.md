# Try and Catch

Una aplicación web que explica cómo está hecha ella misma: el camino recorrido, las decisiones tomadas y las descartadas, contado en primera persona por la propia aplicación. Todo el detalle, en el [concepto de producto](docs/core/product/concept.md).

## Requisitos

- Node ≥ 24
- pnpm 11 — con Corepack basta `corepack enable`; la versión exacta la fija el campo `packageManager` de `package.json`

## Comandos

```bash
pnpm install   # instalar dependencias
pnpm dev       # servidor de desarrollo en http://localhost:3000
pnpm build     # build de producción
pnpm preview   # servir el build de producción en local
```

## Licencia

[MIT](LICENSE)
