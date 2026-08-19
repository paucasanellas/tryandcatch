# Merges

Cómo entra una pull request en `main`.

- **Siempre squash**: la PR es un cambio lógico y entra en `main` como un único commit.

```bash
gh pr merge <number> --squash --delete-branch
```

- **El título de la PR es el subject del commit de squash** (GitHub añade el `(#N)` al final). Por eso el título va en inglés y en formato conventional commit — ver [pull-requests.md](pull-requests.md).
- El cuerpo del squash conserva los commits de la rama con sus trailers de co-autoría.
- **La rama se borra al mergear**, local y remota (`--delete-branch`).
- **Nunca force-push a `main`** ni reescribir la historia de una rama que otra persona ya ha bajado.

## Efectos del merge

| Efecto | Mecanismo |
|---|---|
| El issue se cierra | El `Closes #N` del cuerpo de la PR |
| La tarjeta pasa a *Done* | El workflow del tablero, al cerrarse el issue |
| Se despliega producción | Continuous deployment desde `main` (ver [deployment.md](deployment.md)) |

Si la tarjeta no se mueve sola, lo habitual es que la PR no llevara el `Closes` en el cuerpo o que el issue no estuviera en el tablero.
