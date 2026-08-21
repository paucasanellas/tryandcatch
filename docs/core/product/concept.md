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

| Núcleo (MVP, versión 1.0.0) | Qué hace |
|---|---|
| Homepage | Hub de entrada: presenta el concepto, el nombre y enlaza al resto |
| Bitácora | Artículos contando cada iteración: qué se hizo, y las decisiones tomadas y descartadas dentro del propio artículo |
| Releases | Los cambios por versión, en formato clásico |
| Página «en desarrollo» | El placeholder honesto para secciones a medias; permite estar en producción desde la 0.1.0 sin esconder nada |
| Enlaces al código real | Cada artículo enlaza al PR, issue o diff que implementa lo que cuenta |
| Buscador | Encontrar artículos y cambios |

## Post-MVP

En orden de intención, sin compromiso de fechas:

| Funcionalidad | Qué hace |
|---|---|
| RSS de la bitácora | La forma mínima de seguir el camino |
| Stack viva | Qué tecnologías usa la app ahora mismo y por qué, cada una enlazando a su artículo |
| Roadmap público | El tablero del proyecto visible: el camino antes de andarse |
| «Esta app ahora mismo» | Versión desplegada, último deploy y métricas de la propia app |
| Timeline del camino | Vista cronológica que une versiones y artículos |
| Multi-idioma | Catalán e inglés sobre la base ya preparada |
| Discusión por artículo | Comentarios del lector en cada artículo |
| Newsletter | La evolución del RSS, cuando haya audiencia que lo justifique |

## Camino a producción

- **En producción lo antes posible**, empezando por la homepage.
- **Versiones 0.x.x**: públicas aunque haya páginas a medio hacer — no se esconde nada, un «en desarrollo» visible es parte del relato.
- **Versión 1.0.0**: el MVP — las seis funcionalidades del núcleo completas.

## Idioma y tono

- Contenido en **castellano**, preparado para ampliar a catalán e inglés en el futuro.
- Tono: **cercano, en primera persona, honesto con los errores y con un toque de humor**.
