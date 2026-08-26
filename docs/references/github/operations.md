# Operaciones en GitHub

Cómo se realizan las operaciones remotas sobre issues, pull requests y proyectos.

- **GitHub se gestiona con `gh`.** Usar la CLI para consultar o modificar issues, pull requests, checks, releases y GitHub Projects.
- `git` se mantiene para las operaciones del repositorio: `fetch`, `pull` y `push`.
- **Nunca usar el navegador integrado, automatización de navegador ni la interfaz web de GitHub como alternativa a `gh`.**
- Antes de una operación remota con `gh`, comprobar que la autenticación necesaria está disponible.
- Si `gh` falla por autenticación, permisos, configuración o acceso a la API:
  1. Detener la operación remota de GitHub.
  2. Informar al usuario con el comando y la salida reales.
  3. Esperar su decisión.
- No ejecutar `gh auth login`, sustituir credenciales ni recurrir a otro canal sin una instrucción explícita del usuario.
- El navegador integrado se reserva para validar la aplicación, no para operar sobre `github.com`.
