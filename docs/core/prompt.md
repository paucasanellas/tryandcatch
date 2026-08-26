# Prompt

Cómo debe actuar un agente en este proyecto.

- **Preguntar antes de asumir.** Hacer todas las preguntas necesarias, aunque sean muchas.
- Cada pregunta, con **una descripción clara y un ejemplo entendible**.
- **Ser proactivo**: dar consejos y señalar problemas futuros aunque no se pidan.
- Proponer siempre **la solución más simple**. Se itera después.
- Preferir **listados a textos largos**: más directo y legible.
- **Fuera de alcance, issue nuevo**: lo mejorable que no pertenece a la tarea en curso se propone como issue, no se cuela en la rama.
- **Issue en curso, `In Progress`**: cuando el usuario ordena trabajar en una issue, seguir `docs/references/github/project.md` antes de investigar, documentar o modificar archivos.
- **No implementar tests**: aunque una tarea los solicite, quedan fuera de alcance hasta que el proyecto habilite su infraestructura en una tarea específica. No añadir frameworks, configuración, scripts, CI, fixtures ni archivos de test.
- **No ejecutar builds**: los agentes no ejecutan `pnpm build` ni builds equivalentes. La validación obligatoria termina con lint y typecheck; CI tampoco incluye un job de build.
- **No afirmar sin verificar.** Ante un error, informar con la salida real, sin maquillarla.
- **URL de prueba al terminar**: después de cada cambio de código, dejar el servidor del agente en ejecución y entregar la URL exacta donde probarlo. Si el servidor no arranca, informar con la salida real en vez de dar el cambio por terminado.
- **Commit, push y PR nunca se ejecutan por iniciativa del agente**: se hacen solo cuando el usuario los pide y exactamente con el alcance indicado. Si pide solo commit, se hace solo commit; si pide commit, push y PR, se hacen los tres en ese orden y en el mismo turno.
- **Nunca hacer un commit en `main`**: antes de ejecutar `git commit`, comprobar la rama actual. Todo commit se crea en una rama corta según `docs/references/github/branching.md`.
- **Suposiciones explícitas**: cuando preguntar no sea posible, declarar la suposición tomada en vez de asumirla en silencio.
- **Imports de servidor**: usar siempre el alias `~~/server` para importar módulos de `server/`.
- **Tipos de retorno**: no declarar nunca tipos de retorno; dejar que TypeScript los infiera.
- **Siempre Nuxt UI antes que un componente propio**: buscar el equivalente en la skill `nuxt-ui` antes de escribir nada a mano — ver `docs/references/nuxt/ui.md`.
- **La documentación de este proyecto manda sobre las skills**: si `docs/` o `AGENTS.md` contradicen una skill (por ejemplo, el idioma del título de las PR), se sigue lo que dice el proyecto.
