# Releases

Cómo se versiona la aplicación: **SemVer con release-please**. Desplegar y versionar son procesos distintos — el deploy ocurre en cada merge (ver [deployment.md](deployment.md)); la release, cuando se decide publicarla.

## Flujo

1. Los merges a `main` se acumulan; release-please mantiene abierto un PR de release (`chore: release vX.Y.Z`) con la versión calculada y las notas agrupadas a partir de los conventional commits.
2. **Antes de mergearlo se cura, y la redacción la hace Claude**: a partir de los commits y PRs de la versión, redacta las `✨ Highlights` en castellano siguiendo la plantilla y las aplica al PR de release (`CHANGELOG.md` de la rama y cuerpo del PR). El usuario revisa y decide el merge.
3. Al mergear el PR de release se crean **el tag `vX.Y.Z` y la GitHub Release** con esas notas.
4. La página de changelog de la aplicación se alimenta de las GitHub Releases.

## Secciones del changelog

| Sección | Se alimenta de |
|---|---|
| `✨ Highlights` | Redacción a mano al curar el PR de release |
| `⚠ BREAKING CHANGES` | Commits con `!` (`feat(api)!: …`) |
| `🚀 Features` | `feat` |
| `🐛 Bug Fixes` | `fix` |
| `🔥 Performance` | `perf` |
| Full Changelog | Automática: enlace de comparación en el encabezado de versión, a partir de la segunda release |

- **El tipo de commit decide la sección**: un `perf` mal etiquetado como `refactor` no aparece en el changelog — solo `feat`, `fix`, `perf` y los breaking generan sección; el resto de tipos (`refactor`, `docs`, `chore`, `style`, `test`, `build`, `ci`, `revert`) quedan ocultos.
- La versión también sale de los commits: `fix` → patch, `feat` → minor, `!` → major.

## Formato de las notas

Referencia visual: las releases de [nuxt/ui](https://github.com/nuxt/ui/releases).

- **Las secciones automáticas van en inglés con emoji**, coherentes con los commits.
- **Las Highlights se escriben en castellano**, el idioma del contenido.
- Plantilla de curación — se añade al principio de la entrada de versión:

```markdown
### ✨ Highlights

Una o dos frases contando qué trae la versión.

#### 🌟 <hito>

Solo si hay varios hitos que merecen su propio apartado.
```
