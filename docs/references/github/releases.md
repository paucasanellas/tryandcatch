# Releases

Cómo se versiona la aplicación: **SemVer con release-please**. Desplegar y versionar son procesos distintos — el deploy ocurre en cada merge (ver [deployment.md](deployment.md)); la release, cuando se decide publicarla.

## Flujo

1. Los merges a `main` se acumulan; release-please mantiene abierto un PR de release (`chore: release vX.Y.Z`) con la versión calculada y las notas agrupadas a partir de los conventional commits.
2. **Antes de mergearlo se cura**: se redactan las Highlights y se ajusta la redacción de las notas. Es el único paso editorial.
3. Al mergear el PR de release se crean **el tag `vX.Y.Z` y la GitHub Release** con esas notas.
4. La página de changelog de la aplicación se alimenta de las GitHub Releases.

## Secciones del changelog

| Sección | Se alimenta de |
|---|---|
| Highlights | Redacción a mano al curar el PR de release |
| Breaking Changes | Commits con `!` (`feat(api)!: …`) |
| Features | `feat` |
| Bug Fixes | `fix` |
| Performance | `perf` |
| Full Changelog | Todos los commits de la release |

- **El tipo de commit decide la sección**: un `perf` mal etiquetado como `refactor` no aparece en el changelog (`refactor`, `docs` y `chore` no generan sección).
- La versión también sale de los commits: `fix` → patch, `feat` → minor, `!` → major.
