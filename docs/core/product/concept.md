# Concepto de producto

Qué es Try and Catch y con qué criterio se juzga cualquier decisión sobre ella.

## Qué es

- **Una aplicación web que explica cómo está hecha ella misma**: el camino recorrido hasta la versión actual, las decisiones tomadas y las descartadas.
- El relato lo cuenta la propia aplicación, en primera persona — no un observador externo.
- Es una aplicación del mundo real: tecnologías punteras, buenas prácticas y **un punto deliberado de sobreingeniería**, porque el objetivo es aprender en el camino.
- **Todo es open source**: el código es público y el lector puede pasar del relato a la implementación real. Las plataformas externas (hosting, servicios) no son públicas, pero cómo se integran en el repositorio, sí.

## El nombre

«Try and Catch»: intentar cosas — si aciertas, adelante; si fallas, capturas el error, aprendes, lo cuentas y evitas que se repita. Juego de palabras con el try/catch de programación.

## Problema y público

- Los tutoriales y blogs muestran cómo hacer las cosas, pero **nunca desde dentro de una aplicación real** — Try and Catch sí, y contado por la propia aplicación.
- Público: **developers de cualquier nivel**, del que aprende viendo cómo se hace de verdad al avanzado curioso por las decisiones de otros.

## Qué NO es

- **No es un tutorial**: no promete «aprende X en 10 pasos».
- **No es un portfolio**: no existe para vender a su autor.
- **No sienta cátedra**: documenta elecciones y sus porqués, no verdades.
- **No es un blog aburrido**: el relato es ameno.

## Funcionalidades

| Núcleo (MVP) | Qué hace |
|---|---|
| Homepage | Hub de entrada al resto de la aplicación |
| Bitácora | Artículos contando cada iteración del camino |
| Changelog | Los cambios por versión, en formato clásico |

En el radar, sin compromiso: página de stack viva, catálogo de decisiones (tomadas y descartadas), enlaces desde cada artículo al código real, roadmap público, métricas de la propia app, RSS.

## Camino a producción

- **En producción lo antes posible**: las versiones 0.x.x son públicas aunque haya páginas a medio hacer — no se esconde nada, un «en desarrollo» visible es parte del relato.
- **La versión 1.0.0 es el MVP**: homepage, bitácora y changelog completos.

## Idioma y tono

- Contenido en **castellano**, preparado para ampliar a catalán e inglés en el futuro.
- Tono: **cercano, en primera persona, honesto con los errores y con un toque de humor**.
