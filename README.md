# Try and Catch

A web application that explains how it is built: the path taken, the decisions made and the ones discarded, told in first person by the application itself. Full details in the [product concept](docs/core/product/concept.md) (in Spanish).

## Requirements

- Node ≥ 24
- pnpm 11 — with Corepack, `corepack enable` is enough; the exact version is pinned by the `packageManager` field in `package.json`

## Commands

```bash
pnpm install   # install dependencies
pnpm dev       # development server at http://localhost:3000
pnpm build     # production build
pnpm preview   # serve the production build locally
```

## License

[MIT](LICENSE)
