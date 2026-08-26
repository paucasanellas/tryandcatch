# Despliegue

Cómo llega un cambio a producción: **continuous deployment desde `main` en Vercel**.

| Evento | Despliegue |
|---|---|
| Merge a `main` | Producción, automático |
| Pull request normal abierta o actualizada | Preview en URL temporal propia, automático |
| Rama `dependabot/**` | Sin preview |

- **Cada merge a `main` es un deploy a producción.** No hay paso manual de publicación ni rama de release.
- Por eso **`main` tiene que estar siempre desplegable**: nada entra sin pull request con los checks en verde (la protección de rama lo exige).
- **Cada PR normal tiene su preview**: Vercel publica la URL como check de la PR. Sirve para revisar cambios visuales sin clonar la rama y vale como paso de «Cómo probarlo».
- Las ramas automáticas de Dependabot no generan previews; sus cambios siguen pasando por CI y se despliegan al mergear en `main`.
- Publicar una versión con sus notas es un proceso aparte del deploy — ver [releases.md](releases.md): se despliega en cada merge, se versiona cuando se decide.
