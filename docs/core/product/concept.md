# Concepto de producto

Qué es Try and Catch y con qué criterio se juzga cualquier decisión sobre ella.

## Qué es

- **Una aplicación web representada como una nave espacial gobernada por una inteligencia artificial experimental y extremadamente avanzada.**
- La IA llegó desde lo más profundo del universo a un planeta similar a la Tierra después de sufrir un reinicio. No recuerda su origen, su misión anterior ni quién borró su memoria. El reinicio ocurrió antes de detectar el planeta.
- El planeta está degradado por un colapso pasado. Try y Catch viven entre sus restos y se ven obligados a abandonarlo.
- La IA los encuentra, reconoce que necesitan ayuda y abre la nave para ellos. Desde ese momento redacta la bitácora y cuenta el relato en primera persona.
- Try y Catch representan juntos a la persona que desarrolla la aplicación. Mejoran, mantienen y reparan la nave con ayuda de la IA.
- La evolución de la web se cuenta como una serie de aventuras espaciales. Cada episodio parte de trabajo real del proyecto y conserva sus decisiones, descartes, errores y aprendizajes.
- Es una aplicación del mundo real: tecnologías punteras, buenas prácticas y **un punto deliberado de sobreingeniería**, porque el objetivo es aprender en el camino.
- **Todo es open source**: el código es público y el lector puede pasar del relato a la implementación real. Las plataformas externas (hosting, servicios) no son públicas, pero cómo se integran en el repositorio, sí.

## El nombre

«Try and Catch»: intentar cosas — si aciertas, adelante; si fallas, capturas el error, aprendes, lo cuentas y evitas que se repita. Juego de palabras con el try/catch de programación.

## La bitácora

**La bitácora es el registro de misión de la nave Try and Catch.** Conserva el rumbo, las averías, las maniobras y lo aprendido durante su desarrollo.

| Concepto | Papel |
|---|---|
| Bitácora | El conjunto ordenado de episodios sobre el viaje y la evolución de la aplicación |
| Artículo | Un episodio narrado por la IA sobre una iteración, decisión, descarte o error concreto |
| Release | El registro técnico de los cambios publicados en una versión |

- Cada episodio combina una aventura espacial sutil con el trabajo de desarrollo que la origina.
- La aventura da contexto y continuidad. Los hechos técnicos siguen siendo verificables y no se sustituyen por ficción.
- Cada entrada enlaza el relato con evidencias reales del repositorio.
- La bitácora explica cómo y por qué cambió la aplicación; las releases enumeran qué cambió en cada versión.

## Cronología narrativa

| Etapa técnica | Etapa del relato |
|---|---|
| Versiones `0.x.x` | La IA, Try y Catch preparan la nave en el planeta antes de partir |
| Versión `1.0.0` | Primer despegue y nueva entrada principal de la bitácora |
| Versiones posteriores | El viaje, los destinos y las averías que aparezcan durante la misión |

- **La etapa anterior a la `1.0.0` no es el viaje: es la preparación completa de la nave.**
- La IA despliega drones para buscar provisiones, equipamiento y piezas. En el plano técnico representan subagentes que investigan, documentan o implementan trabajo acotado.
- La nave dispone de un fabricador aditivo capaz de transformar polímeros avanzados y materiales compatibles en trajes, herramientas, piezas y otros objetos útiles para la historia. Funciona como una impresora 3D avanzada: necesita materia prima, energía, un modelo correcto y tiempo; no resuelve problemas sin coste ni preparación.
- Los trajes espaciales y los monos de trabajo se fabrican a medida durante esta etapa. Las provisiones, el agua, los componentes del sistema de oxígeno y la materia prima se recuperan mediante drones. Nada se presupone disponible antes de que el relato lo introduzca.
- El origen de la IA y la causa del reinicio permanecen como misterio. No se resuelven sin una decisión explícita de producto.

## Personajes

**La IA, Try y Catch forman la tripulación de una misma nave.** Try y Catch son dos facetas complementarias de la persona que la desarrolla.

| Personaje | Representación | Faceta |
|---|---|---|
| IA de a bordo | Una presencia integrada en la nave, sin cuerpo humanoide | Gobierna la nave, coordina subagentes, ayuda a la tripulación y redacta la bitácora |
| Try | Un hombre adulto | Curiosidad, desarrollo, exploración e impulso por probar algo nuevo |
| Catch | Un adolescente | La faceta que falla a menudo, actúa con buena intención, captura el error y vuelve a intentarlo |

- Try y Catch dan nombre al proyecto y representan juntos al desarrollador humano. No son dos autores ni dos productos distintos.
- Try ronda los cuarenta años. Su presencia es sobria, práctica y experimentada; no se representa como un héroe idealizado.
- Catch tiene entre quince y diecisiete años. Es claramente más joven y bajo que Try, pero nunca parece un niño ni un adulto reducido.
- No se presupone parentesco entre ellos. La diferencia de edad expresa dos etapas de una misma identidad, no una relación paternal.
- Ambos conservan proporciones humanas naturales y una expresividad contenida. Su ropa y equipamiento se adaptan al entorno y a su edad.
- La IA no aparece como un robot independiente. Su presencia se expresa mediante la nave, su voz, sus sensores o su luz.

## Problema y público

- Los tutoriales y blogs muestran cómo hacer las cosas, pero **nunca desde dentro de una aplicación real** — la IA de Try and Catch sí, desde los sistemas de la propia nave.
- Público: **developers de cualquier nivel**, del que aprende viendo cómo se hace de verdad al avanzado curioso por las decisiones de otros.

## Qué NO es

- **No es un tutorial**: no promete «aprende X en 10 pasos».
- **No es un portfolio**: no existe para vender a su autor.
- **No sienta cátedra**: documenta elecciones y sus porqués, no verdades.
- **No es un blog aburrido**: el relato es ameno.
- **No es ficción desconectada del proyecto**: cada episodio explica trabajo real y permite comprobarlo en el repositorio.

## Funcionalidades

| Núcleo (MVP, versión 1.0.0) | Qué hace |
|---|---|
| Homepage | Hub de entrada: presenta el concepto, el nombre y enlaza al resto |
| Bitácora | Artículos sobre cada iteración: qué se hizo, qué se decidió, qué se descartó y qué se aprendió |
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
- Voz: **la IA de a bordo narra en primera persona** y trata al lector como observador de la misión.
- Al principio la IA es fría, precisa y mecánica. Formula estados, diagnósticos e inferencias; su trasfondo bondadoso se revela mediante decisiones y anomalías de prioridad, no mediante sentimentalismo explícito.
- Su voz puede ganar cercanía conforme avanza la serie, pero conserva precisión, misterio cósmico, honestidad con los errores y humor seco.
