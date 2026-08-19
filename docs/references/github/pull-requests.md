# Pull requests

Cómo se escribe una pull request. Ejemplo real del formato: [PR #4](https://github.com/paucasanellas/tryandcatch/pull/4).

## Título

**En inglés y en formato conventional commit** (`docs: add …`), porque el squash lo usa tal cual como subject del commit — ver [merges.md](merges.md).

- Tipo y reglas del subject: los mismos que un commit (`feat|fix|refactor|perf|docs|chore`, imperativo, minúscula, ≤72 caracteres, sin punto final).

| Correcto | Incorrecto |
|---|---|
| `feat(auth): add OAuth login` | `Añade login con OAuth` |
| `fix(auth): clear the session cookie on logout` | `Arreglos varios` |

## Cuerpo

**En castellano.** La plantilla `.github/pull_request_template.md` lo pre-rellena con estos apartados:

| Apartado | Contenido | Opcional |
|---|---|---|
| `## Qué` | Una o dos frases sobre el cambio | No |
| `## Por qué` | La razón; normalmente un resumen del issue | No |
| `## Cómo probarlo` | Pasos concretos de verificación, no «probar el login» | No |
| `## A tener en cuenta` | Variables de entorno nuevas o cambiadas, migraciones, pasos manuales, breaking changes | Sí |
| `## Capturas` | Antes/después en cambios visuales | Sí |

- **El apartado opcional que no aplica se elimina**, no se deja con relleno.
- La guía de relleno va en comentarios HTML dentro de la plantilla: desaparecen al publicar.
- **La línea `Closes #N` cierra el issue al mergear** y viene pre-escrita al final de la plantilla; con `Refs #N` se enlaza sin cerrar.
- La URL de preview de Vercel de la PR vale como paso de «Cómo probarlo» en cambios visuales (ver [deployment.md](deployment.md)).

## Draft

Una PR que todavía se está escribiendo se abre con `--draft`. Pasarla a lista es la señal explícita de «ya se puede revisar».
