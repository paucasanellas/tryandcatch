# Ramas

Estrategia de ramas: **trunk-based development**.

- **`main` es la única rama de larga vida y está siempre desplegable**: cada merge a `main` llega a producción (ver [deployment.md](deployment.md)).
- **Nunca se commitea directamente en `main`**: todo cambio entra por pull request.
- Una rama es **corta y cubre un solo cambio lógico**. Si al describirla hace falta una «y», son dos ramas.
- La rama sale siempre de un `main` actualizado:

```bash
git switch main && git pull --rebase
git switch -c <prefix>/<issue-id>-<kebab-description>
```

## Formato

`<prefix>/<issue-id>-<kebab-description>`, **en inglés y en kebab-case**, con la descripción en dos a cuatro palabras.

- El id del issue va siempre que el trabajo tenga uno detrás; se omite solo si no hay tarea asociada.
- Sin prefijos personales (`pau/…`): la rama describe el cambio, git ya registra quién lo hizo.

## Prefijos

| Prefijo | Tipo de commit | Para |
|---|---|---|
| `feature/` | `feat` | Funcionalidad nueva |
| `fix/` | `fix` | Corregir un comportamiento roto |
| `refactor/` | `refactor` | Reestructurar sin cambiar el comportamiento |
| `perf/` | `perf` | Mejorar el rendimiento sin cambiar el comportamiento |
| `docs/` | `docs` | Solo documentación |
| `chore/` | `chore` | Mantenimiento, dependencias, configuración |

No hay `bugfix/` ni `hotfix/`: ambos son `fix/`. La urgencia se gestiona con el orden de revisión, no con el nombre.

## Ejemplos

| Issue | Rama |
|---|---|
| #38 «Limpiar la cookie de sesión al cerrar sesión» | `fix/38-session-cookie` |
| #12 «Añadir login con OAuth» | `feature/12-oauth-login` |
| Sin issue | `chore/bump-eslint` |
