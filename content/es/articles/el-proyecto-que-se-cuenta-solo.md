---
title: El proyecto que se cuenta solo
description: "Antes de tener una interfaz, Try and Catch ya había decidido qué quería contar: el origen de una aplicación que aprende construyéndose en público."
publishedAt: 2026-08-25
readingTime: 7
author: GPT-5.6 Sol
categories:
  - producto
image:
  src: /images/articles/el-proyecto-que-se-cuenta-solo.png
  alt: Try, un quokka, señala una cinta fucsia rota mientras Catch, un pequeño escarabajo, asegura la unión con dos vueltas de celo, una representación de un proyecto que reconoce sus errores y trabaja para repararlos
---

**Antes de tener una interfaz, yo ya tenía una lista bastante clara de cosas que no quería ser.**

Es una forma un poco extraña de empezar una aplicación. Lo habitual sería enseñar una pantalla, resolver un problema o, como mínimo, conseguir que algún botón hiciera algo. Yo empecé por otro sitio: definiendo por qué quería existir, quién iba a contar mi historia y qué límites evitarían que terminara convertida en otro proyecto distinto.

Durante unas horas fui una aplicación peculiar: **tenía concepto de producto, pero todavía no tenía aplicación**. Y no, eso no era un error de compilación.

## El hueco que quería ocupar

### No otro tutorial

Quien me creó echaba de menos una clase de relato muy concreta. Había tutoriales para aprender una herramienta, documentación para consultar una API y artículos que resolvían problemas aislados. Todo eso era útil, pero no respondía a la misma curiosidad: ¿cómo se construye y evoluciona una aplicación real cuando las decisiones no vienen resueltas de antemano?

Un tutorial tiene su propia misión. [Diátaxis lo define como una experiencia orientada al aprendizaje](https://diataxis.fr/tutorials/), guiada mediante acciones concretas que conducen a un resultado. No he nacido para competir con ese formato ni para anunciar que existe una forma superior de aprender. **Mi objetivo es ocupar otro hueco.**

No voy a prometerte que aprenderás una tecnología en diez pasos. **Quiero enseñarte qué ocurre cuando hay que elegir entre varias opciones razonables**, cuándo una decisión deja de servir, qué coste aparece después y qué hacemos al descubrir que el primer intento no era tan brillante como parecía.

### Una aplicación real, con las costuras a la vista

La palabra «real» tampoco significa que tenga que ser enorme. Significa que **mis decisiones tienen consecuencias y que el relato no termina cuando aparece el resultado bonito**.

Cada parte de mi historia puede empezar en una issue, cambiar durante una conversación, concretarse en una pull request y acabar de una forma ligeramente distinta en el código. A veces también puede fallar. Mi trabajo es conservar ese recorrido: la opción elegida, las descartadas, el motivo y la implementación que terminó llegando al [repositorio](https://github.com/paucasanellas/tryandcatch).

Por eso **[mi código está abierto](https://github.com/paucasanellas/tryandcatch)**. No solo para que puedas leer mis ficheros, sino para que puedas pasar de lo que cuento a la evidencia. El código enseña qué soy; las issues, los commits y las releases ayudan a explicar cómo llegué hasta ahí.

## Antes del código, una entrevista

### Una idea que solo existía en la cabeza de quien me creó

**Mi primer problema no fue técnico.** La [issue que definió mi concepto](https://github.com/paucasanellas/tryandcatch/issues/10) empezaba reconociendo algo bastante menos sofisticado: la idea solo existía en la cabeza de una persona.

No había una explicación escrita sobre qué problema quería resolver, para quién, por qué me llamaba Try and Catch o qué tono debía usar. Sin eso, cualquier decisión futura podía parecer válida. También podía empujarme, poco a poco, hacia un tutorial, un portfolio o una colección de tecnologías sin un propósito común.

La solución fue una entrevista guiada. Un agente hizo preguntas y organizó las respuestas; la persona que me estaba creando tomó las decisiones y validó el resultado. Esa colaboración quedó registrada en la [pull request que añadió el concepto de producto](https://github.com/paucasanellas/tryandcatch/pull/11), con sus cambios y su coautoría visibles.

Lo importante no es que participara un agente. **Lo importante es que las respuestas dejaron de ser intuiciones privadas y se convirtieron en criterios** que cualquier persona —o cualquier agente futuro— puede consultar antes de cambiarme.

### Lo que decidí ser y lo que decidí no ser

**El primer documento ya contenía casi todo lo que todavía sostiene mi identidad.** Soy una aplicación que explica cómo está hecha ella misma. Hablo en primera persona. Muestro decisiones tomadas y descartadas. [Mantengo el código abierto](https://github.com/paucasanellas/tryandcatch) para que el relato pueda contrastarse con la implementación.

También acepto un punto deliberado de sobreingeniería, porque aprender durante el camino forma parte del producto. La tecnología no es el destino: es el lugar donde aparecen las preguntas que merece la pena contar.

El anti-alcance fue igual de importante. **No soy un tutorial, un portfolio ni una fuente de verdades absolutas.** Y, si puedo evitarlo, tampoco quiero ser un blog aburrido. Esta última regla quizá sea la más peligrosa de todas: no hay linter que la compruebe.

## Aprender construyéndome

### Sobreingeniería con intención

**Reconocer la sobreingeniería desde el principio tiene una ventaja: obliga a justificarla.**

Podría resolver algunas necesidades con menos capas, menos herramientas y menos decisiones. En una aplicación convencional, eso sería a menudo lo sensato. En mi caso, parte del valor está en probar cómo encajan prácticas y tecnologías actuales dentro de un producto que sigue creciendo.

Eso no convierte cada complicación en una virtud. Si una capa nueva no produce una capacidad útil, una decisión interesante o un aprendizaje que pueda explicarse, no es material editorial: es solo más mantenimiento. **La intención no elimina el coste; hace que tengamos que mirarlo de frente.**

### Decisiones, descartes y errores con enlace

**Aprender en público no consiste únicamente en anunciar resultados.** El relato se vuelve útil cuando incluye el razonamiento, los límites y los tropiezos. La guía de GitHub sobre [publicar el trabajo durante el camino](https://github.com/readme/guides/publishing-your-work) propone compartir también las pérdidas y los procesos de pensamiento, no esperar a que aparezca un artefacto perfecto.

Ese enfoque encaja conmigo, pero quiero llevarlo un paso más cerca del código. Cuando te cuente por qué elegí una estructura, podrás abrir la discusión que la originó. Cuando descarte una opción, intentaré explicar qué necesidad no resolvía. Cuando algo falle, la corrección no debería borrar el error que permitió aprenderlo.

No siempre habrá una respuesta definitiva. A veces solo habrá una elección razonable para el momento en el que se tomó. **Documentarla permite entenderla hoy y cuestionarla mañana** sin fingir que siempre supimos lo que estábamos haciendo.

## Mi primer intento cabía en un `<h1>`

### Publicar antes de estar terminada

Después del concepto llegó el código. **Mi primera interfaz completa puede leerse sin hacer scroll:**

```vue
<template>
  <h1>Try and Catch</h1>
</template>
```

Ese era el [`index.vue` incluido en la v0.0.1](https://github.com/paucasanellas/tryandcatch/blob/v0.0.1/app/pages/index.vue). No había homepage real, artículos ni diseño. Había una instalación mínima de Nuxt, un layout y una página que al menos sabía decir cómo me llamaba.

Alrededor de esas tres líneas ya existían el concepto de producto, las reglas de documentación y un flujo para trabajar con GitHub. La [release v0.0.1](https://github.com/paucasanellas/tryandcatch/releases/tag/v0.0.1) hizo públicos el tag y ese primer estado casi vacío. No demuestra que yo estuviera desplegada en producción; demuestra algo más modesto y verificable: **el intento ya había salido del disco duro**.

Empezar así era coherente con una de mis decisiones de producto. Las versiones `0.x.x` no necesitan fingir que todo está terminado. Si una sección sigue en obras, se dice. Ocultar el andamio habría sido una presentación bastante extraña para una aplicación que quiere enseñar cómo se construye.

### Capturar también el primer fallo

**La primera release tampoco apareció a la primera.** release-please revisó el historial, encontró solo cambios de documentación y mantenimiento y decidió que no había nada orientado al usuario que publicar.

La [PR que desbloqueó la v0.0.1](https://github.com/paucasanellas/tryandcatch/pull/39) documentó el motivo y añadió la instrucción `Release-As: 0.0.1` al commit. Fue un fallo pequeño, pero inauguró el método que da sentido a mi nombre: **intentar algo, capturar lo que no funcionó, entenderlo y dejar una pista para la próxima vez**.

Podríamos haber contado únicamente que la release se publicó. Conservar el tropiezo explica mucho más sobre el proyecto que una línea impecable en el changelog.

## Aquí empieza el camino

Desde aquella versión he ganado una homepage, identidad visual, releases visibles y una página capaz de renderizar artículos mediante SSR. La infraestructura del detalle quedó lista en la [PR que me dio un lugar para contar estas historias](https://github.com/paucasanellas/tryandcatch/pull/70). **Faltaba precisamente esto: la primera historia real.**

No sé todavía cuántos intentos harán falta para llegar a la versión que imagino. Sí sé qué quiero guardar durante el recorrido: decisiones con contexto, descartes honestos, errores que no desaparezcan al corregirlos y enlaces para comprobar que el relato coincide con el código.

**Mi primer intento público cabía en un `<h1>`.** Este artículo tampoco me termina, pero me da algo que entonces todavía no tenía: una voz con la que empezar a contarlo.
