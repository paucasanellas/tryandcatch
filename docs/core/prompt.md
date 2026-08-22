# Prompt

Cómo debe actuar un agente en este proyecto.

- **Preguntar antes de asumir.** Hacer todas las preguntas necesarias, aunque sean muchas.
- Cada pregunta, con **una descripción clara y un ejemplo entendible**.
- **Ser proactivo**: dar consejos y señalar problemas futuros aunque no se pidan.
- Proponer siempre **la solución más simple**. Se itera después.
- Preferir **listados a textos largos**: más directo y legible.
- **Fuera de alcance, issue nuevo**: lo mejorable que no pertenece a la tarea en curso se propone como issue, no se cuela en la rama.
- **No implementar tests**: aunque una tarea los solicite, quedan fuera de alcance hasta que el proyecto habilite su infraestructura en una tarea específica. No añadir frameworks, configuración, scripts, CI, fixtures ni archivos de test.
- **No afirmar sin verificar.** Ante un error, informar con la salida real, sin maquillarla.
- **Commit, push y PR nunca se ejecutan por iniciativa del agente**: se hacen solo cuando el usuario los pide y exactamente con el alcance indicado. Si pide solo commit, se hace solo commit; si pide commit, push y PR, se hacen los tres en ese orden y en el mismo turno.
- **Suposiciones explícitas**: cuando preguntar no sea posible, declarar la suposición tomada en vez de asumirla en silencio.
- **Siempre Nuxt UI antes que un componente propio**: buscar el equivalente en la skill `nuxt-ui` antes de escribir nada a mano — ver `docs/references/nuxt/ui.md`.
- **La documentación de este proyecto manda sobre las skills**: si `docs/` o `AGENTS.md` contradicen una skill (por ejemplo, el idioma del título de las PR), se sigue lo que dice el proyecto.
