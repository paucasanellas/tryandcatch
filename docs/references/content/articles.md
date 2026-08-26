# Artículos

Qué es un artículo, qué contrato editorial debe cumplir y cómo se prepara.

## Definición

- **Un artículo es una entrada independiente de la bitácora sobre cómo se construye y evoluciona Try and Catch.**
- Puede explicar desde un cambio de un solo commit hasta varias versiones.
- Puede tratar un tema sin relación con una versión, como producto o plataforma.
- No es un tutorial ni necesita estar vinculado a una release.
- La aplicación cuenta el relato en primera persona. La persona o modelo responsable de la redacción firma el artículo.

## Formato

- Un fichero Markdown por artículo en `content/<locale>/articles/<slug>.md`.
- El nombre del fichero es kebab-case.
- El slug se deriva del nombre del fichero. No se declara en el frontmatter.
- La ruta en castellano es `/articulos/<slug>`.
- El cuerpo contiene el relato y admite Markdown y componentes MDC.
- Los enlaces a issues, pull requests, commits, diffs o cualquier otra referencia viven en el cuerpo. No tienen un campo propio.
- `Decisiones tomadas` y `Decisiones descartadas` son secciones opcionales del cuerpo.
- No existe estado de borrador: si el artículo está en el código publicado, aparece en la web.

## Frontmatter

**Todos los campos son obligatorios.**

| Campo | Tipo | Regla |
|---|---|---|
| `title` | `string` | Título visible del artículo |
| `description` | `string` | Resumen para listados y metadatos |
| `publishedAt` | `date` | Fecha prevista o efectiva de publicación en formato `YYYY-MM-DD` |
| `readingTime` | `number` | Minutos de lectura, escritos manualmente como entero positivo |
| `author` | `string` | Identificador visible de la persona o modelo responsable de la redacción |
| `categories` | `string[]` | Una o más categorías válidas, sin duplicados |
| `image.src` | `string` | Ruta de la imagen de portada |
| `image.alt` | `string` | Descripción accesible de la portada |

- Los strings que contienen `:` se escriben entre comillas para que YAML no los interprete como un objeto.
- El Markdown necesita un `publishedAt` válido aunque todavía esté en una rama. La fecha se actualiza antes de publicar si deja de coincidir con la publicación real.

```yaml
---
title: Definir qué es un artículo
description: El contrato editorial y técnico de los artículos de Try and Catch.
publishedAt: 2026-08-25
readingTime: 5
author: GPT-5.6 Sol
categories:
  - producto
  - frontend
image:
  src: /images/articles/definir-un-articulo.webp
  alt: Un documento Markdown con el contrato de un artículo
---
```

## Autoría

**La autoría identifica quién redactó el artículo, no quién lo encargó, aprobó o revisó.** La voz narrativa sigue siendo Try and Catch aunque firme una persona o un modelo.

| Autor | Formato | Ejemplo |
|---|---|---|
| Persona | Nombre público completo | `Pau Casanellas` |
| Modelo | Identificador exacto del modelo | `GPT-5.6 Sol` |

- `author` acepta cualquier string no vacío. No existe una lista cerrada de personas, proveedores o modelos.
- El modelo usa el identificador exacto expuesto por el entorno. No se añade el effort al valor.
- Un modelo de cualquier proveedor sigue el mismo formato. El contrato no presupone ChatGPT ni OpenAI.
- Por defecto, el agente encargado redacta el artículo después de la aprobación y firma con el identificador exacto del modelo.
- Si una persona redacta el borrador, firma con su nombre. Una corrección posterior no cambia la autoría.
- Una reescritura sustancial solo cambia `author` mediante una decisión editorial explícita.
- El valor se conserva literalmente para mostrarlo y filtrarlo. No se extraen ni infieren proveedor u otros metadatos analizando el string.
- La autoría múltiple queda fuera del contrato actual. Si aparece esa necesidad, requiere un cambio de schema independiente.

## Escritura

### Negritas

**Las negritas permiten localizar la tesis y las ideas que cambian el sentido de una sección.** No son decoración.

- Resaltar afirmaciones centrales, contrastes, decisiones, errores, aprendizajes y conclusiones.
- Preferir una frase breve o el fragmento decisivo. No poner párrafos completos en negrita.
- Repartir los destacados durante el artículo. Evitar concentrarlos solo en la introducción.
- Una frase enlazada puede ir en negrita cuando la fuente y la afirmación forman una sola unidad editorial.

### Enlaces dentro del relato

- Las referencias a «mi código está abierto», «mi repositorio» o formulaciones equivalentes enlazan al [repositorio canónico](https://github.com/paucasanellas/tryandcatch).
- Issues, pull requests, commits, tags, releases y documentación usan anclas que describen qué encontrará el lector.
- Un enlace sostiene o amplía la frase donde aparece. No se añaden URLs aisladas ni anclas genéricas como «aquí».
- Repetir el repositorio está permitido cuando cada enlace acompaña una afirmación de código abierto en una sección distinta.

## Portadas

**Todas las portadas comparten un lenguaje visual, pero cada una representa la tesis de su artículo mediante una metáfora propia.** La coherencia procede del estilo, no de repetir escenarios u objetos.

| Aspecto | Regla |
|---|---|
| Concepto | Traducir la tesis, el conflicto o la transformación principal del artículo a una escena visual concreta |
| Estilo | Ilustración editorial flat texturizada, con geometría clara y surrealismo leve |
| Paleta | Fucsia y lima constantes en el entorno y los elementos narrativos; colores secundarios variables según el artículo |
| Personajes | Try y Catch aparecen juntos como una sola identidad y conservan la representación definida en `docs/core/product/concept.md` |
| Acabado | Formas grandes, dos o tres planos tonales, bordes gráficos y grano de serigrafía, semitono o aerógrafo dentro del color |
| Composición | Formato horizontal 16:10, silueta dominante, foco central seguro, espacio negativo, profundidad plana por capas y lectura clara en miniatura |
| Variación | La metáfora, el escenario, los objetos y los colores secundarios cambian con la idea de cada artículo |
| Exclusiones | Texto, letras, números, código legible, logos, marcas de agua, estética de stock, fotorealismo, modelado naturalista, pincelada pictórica, 3D brillante y acabado genérico de imagen generada |

- **La escena debe permitir intuir de qué trata el artículo sin depender del título.** La metáfora es clara e incorpora detalles tecnológicos solo cuando ayudan a precisar el tema.
- El fucsia y el lima deben reconocerse a primera vista en el entorno o en los elementos narrativos. Try y Catch mantienen colores animales naturales.
- **Flat describe la construcción de la imagen:** cada sujeto se resuelve con pocas formas interconectadas y el volumen procede de planos de color, no de pelo, materiales o iluminación realistas.
- La textura vive dentro de las masas de color. Añade grano e imperfección de impresión sin convertir la imagen en una pintura.
- Los fondos usan geometría, curvas amplias y espacio negativo. No describen un paisaje con profundidad naturalista salvo que la tesis lo necesite.
- El surrealismo es leve y narrativo: altera una relación espacial, una escala o el comportamiento de un objeto para explicar la tesis sin deformar la anatomía ni convertir la escena en un sueño caótico.
- Los detalles tecnológicos se reducen a símbolos, conexiones o geometrías integradas en el mismo lenguaje flat. No imitan una interfaz real.
- El acabado evita tanto el realismo como la perfección sintética: conserva grano, ligeras irregularidades, decisiones compositivas concretas y relaciones físicas comprensibles entre los elementos.
- El prompt empieza por la idea que debe comprenderse, continúa con la metáfora y la acción de los personajes y aplica después el sistema visual compartido.
- Una referencia visual define lenguaje, textura, tratamiento de color, luz y profundidad. **No se copian su composición, personajes, objetos ni escenario.**
- Las decisiones permanentes de estilo y personajes viven en esta referencia y en el concepto de producto. La issue solo concreta la metáfora, la acción, la composición, la paleta secundaria y las exclusiones propias del artículo.
- Si el encargo no permite decidir alguno de esos elementos, el agente pregunta antes de generar. No vuelve a preguntar por decisiones permanentes ya documentadas.
- La dirección visual del mockup identifica por separado: concepto, metáfora, elementos narrativos, estilo común, composición, paleta y exclusiones.
- El alt se redacta después de validar la imagen final. **Describe la escena y explica su relación con la idea principal del artículo:** «[descripción de la escena], una representación de [relación editorial]».
- El alt no reproduce el prompt, no presupone elementos que no aparezcan y no empieza por «imagen de» o «ilustración de».
- Tras aprobar una iteración, la issue conserva la dirección, el prompt y el alt que describen la portada final. Los conceptos descartados solo permanecen cuando funcionan como exclusiones útiles para futuras iteraciones.

## Categorías

**La lista es cerrada.**

| Valor | Uso |
|---|---|
| `producto` | Concepto, alcance y decisiones de producto |
| `frontend` | Interfaz, experiencia y código ejecutado en el cliente |

- Un artículo puede pertenecer a varias categorías.
- Añadir una categoría exige ampliar explícitamente esta lista y el schema que valide los artículos en el mismo cambio.

## Contenido no almacenado

| Dato | Motivo |
|---|---|
| `slug` | Se deriva del nombre del fichero |
| `version` | Un artículo puede abarcar ninguna, una o varias versiones |
| Referencias técnicas | Se integran en el relato del cuerpo |
| `draft` | La publicación depende de que el fichero llegue a la web |
| `updatedAt` | No existe una necesidad editorial actual |

- `readingTime` se mantiene manualmente. Su cálculo automático requiere cambiar este contrato.

## Flujo editorial

**Un artículo se investiga y aprueba antes de redactarse.** La issue con etiqueta `content` es la fuente de verdad del proceso.

### Activación

- La persona responsable editorial crea una issue `content` con un título y una descripción libres.
- El agente empieza el proceso solo cuando recibe una solicitud explícita.
- La issue no necesita una plantilla previa. La entrevista completa lo que falte.
- La investigación y el mockup actualizan el cuerpo de la issue. No viven en un documento temporal del repositorio.

| Estado | Significado |
|---|---|
| `Idea` | Existe el encargo, pero falta definir su intención |
| `Investigando` | La intención está definida y se están reuniendo evidencias |
| `Mockup pendiente de aprobación` | La investigación y la propuesta editorial están completas |
| `Mockup aprobado` | La persona responsable editorial ha aprobado de forma explícita la propuesta |
| `Redacción` | Existe autorización para escribir el artículo |
| `Revisión` | El texto se está corrigiendo o contrastando |
| `Listo para publicar` | Contenido, portada y validaciones están completos |
| `Publicado` | El artículo está disponible en su URL pública |

### 1. Definir la intención

**La investigación no empieza mientras falte una decisión capaz de cambiar la tesis, el alcance o la estructura.** El agente entrevista a la persona responsable editorial y pregunta con ejemplos cuando sea necesario.

| Dato | Pregunta que debe responder |
|---|---|
| Tema | De qué trata el artículo |
| Pregunta central | Qué cuestión concreta resolverá |
| Tesis provisional | Qué idea defenderá o demostrará |
| Motivo | Por qué merece publicarse ahora |
| Promesa | Qué comprenderá, sentirá o podrá hacer el lector |
| Audiencia | Para quién se escribe y qué conocimientos se presuponen |
| Voz y tono | Quién narra y con qué carácter |
| Autoría | Quién redactará y qué valor exacto usará `author` |
| Alcance | Qué entra y qué se excluye |
| Fuentes iniciales | Qué referencias ya conoce la persona entrevistada |

- Una intención atribuida a una persona necesita su testimonio o una fuente que la documente.
- Si no existe una anécdota, motivación o preferencia documentada, se pregunta. No se inventa.
- Las respuestas aceptadas se incorporan a la issue antes de preparar el mockup.

### 2. Investigar

**Las fuentes internas y primarias tienen prioridad.** El orden de consulta es:

1. Documentación de producto, arquitectura y convenciones.
2. Issues, comentarios y discusiones donde se definió el trabajo.
3. Pull requests, revisiones, diffs y commits.
4. Releases y tags.
5. Código histórico que confirme qué existía en ese momento.
6. Código actual que confirme el estado presente.
7. Documentación externa oficial o fuentes primarias.
8. Ensayos originales y fuentes secundarias solventes que aporten contexto.
9. Contenido relacionado y oportunidades de enlazado o difusión.

| Nivel externo | Uso permitido |
|---|---|
| Oficial o primario | Hechos, contratos y comportamiento de una tecnología |
| Ensayo original | Opinión, experiencia o marco expresado por su autor |
| Secundario solvente | Contexto, contraste o descubrimiento de una fuente mejor |

- Una fuente secundaria no demuestra una decisión interna ni la intención de una persona.
- Una PR puede explicar la intención. El diff, el tag o la release confirman qué terminó publicándose.
- El código actual no demuestra cómo era el producto en una fecha anterior.
- Las inferencias se identifican como tales. Las contradicciones y lagunas se convierten en preguntas.
- Las fechas y el orden de los eventos se contrastan antes de construir la narración.
- La búsqueda termina por saturación: nuevas fuentes ya no cambian la tesis, la estructura, las evidencias ni las preguntas abiertas.

### 3. Recopilar evidencias

**El inventario contiene solo fuentes capaces de sostener una afirmación o cambiar el mockup.** No es un volcado del historial de búsqueda.

| Campo | Contenido |
|---|---|
| Identificador | Referencia breve y estable dentro del mockup |
| Fuente | URL permanente, commit o ruta exacta |
| Tipo y autoridad | Documentación, issue, PR, diff, código, release, fuente externa u otro |
| Fecha | Fecha del hecho o de la versión consultada |
| Evidencia | Hecho, decisión o testimonio que sostiene |
| Resumen | Fragmento breve o paráfrasis; nunca una copia extensa |
| Uso | Sección y afirmación donde podría aparecer |
| Verificación | Confirmada, inferencia, contradicción o dato pendiente |

- Las URLs de código histórico apuntan a un commit o tag, no a una rama mutable.
- Un testimonio se distingue de un hecho comprobable en el repositorio.
- Cada afirmación factual del esquema debe poder volver a una o más evidencias.

### 4. Preparar los enlaces

El mockup incluye un mapa separado del inventario de evidencias.

| Dirección | Qué se investiga |
|---|---|
| Saliente | Fuentes y contenido que el artículo enlazará con un ancla descriptiva |
| Entrante interno | Páginas o artículos actuales y futuros que deberían enlazar al artículo |
| Entrante externo | Comunidades, autores o publicaciones con afinidad real |
| Sindicación | Plataformas donde republicar en castellano con la URL original como canonical |

- Cada enlace saliente necesita una función editorial. No se añaden enlaces para alcanzar una cantidad.
- Las oportunidades entrantes indican afinidad, idioma, canal, momento y motivo de contacto.
- Una oportunidad no garantiza un backlink ni autoriza a contactar a nadie.
- El outreach, la publicación en comunidades y la sindicación requieren una petición explícita.
- La sindicación ocurre después de publicar el original y conserva su URL canónica.

### 5. Preparar el mockup

**El mockup no es un primer borrador.** El agente normaliza el cuerpo de la issue con esta estructura:

1. Estado editorial y siguiente acción.
2. Encargo y alcance.
3. Intención: pregunta central, tesis, promesa, audiencia, voz y tono.
4. Conclusiones de la investigación.
5. Inventario de evidencias.
6. Mapa de enlaces y oportunidades de difusión.
7. Título de trabajo y alternativas.
8. Slug, autoría y metadatos provisionales.
9. Esquema ordenado de `h2` y `h3`.
10. Objetivo, ideas, evidencias y enlaces de cada sección.
11. Ideas para la apertura y el cierre.
12. Dirección visual, prompt de portada y alt provisional.
13. Riesgos, afirmaciones pendientes y preguntas para la persona responsable editorial.
14. Criterios de aceptación y tareas posteriores.

- `publishedAt` permanece pendiente durante el mockup hasta que se programe la publicación. Al crear el Markdown se usa una fecha válida y se corrige si cambia el día real de publicación.
- `readingTime` es un rango hasta medir el texto final.
- `author` identifica a quien redactará. Si todavía no se conoce el modelo exacto, permanece pendiente hasta iniciar la redacción.
- El mockup propone una extensión por necesidades editoriales, no por una supuesta preferencia de buscadores.
- El prompt de portada define composición, estilo, relación de aspecto y exclusiones. No genera la imagen.
- La portada se describe como informativa o decorativa y el alt responde a esa función.

### 6. Aprobar

- El agente presenta el mockup con estado `Mockup pendiente de aprobación`.
- La persona responsable editorial puede pedir cualquier número de iteraciones.
- Solo un `aprobado` explícito habilita la redacción.
- Tras la aprobación, el agente registra en el cuerpo de la issue el estado, la fecha y la siguiente fase habilitada.
- No se redacta el artículo ni se genera la portada mientras exista una pregunta capaz de cambiar la tesis, la estructura, el tono o las fuentes.

### 7. Redactar, generar y revisar

Cada acción posterior necesita una petición explícita.

| Petición | Comportamiento |
|---|---|
| Redactar | Crear el Markdown desde el mockup aprobado, registrar el autor real, usar destacados editoriales y enlazar las referencias dentro del cuerpo |
| Generar portada | Crear el archivo desde la dirección aprobada, iterarlo bajo petición y actualizar la issue con la imagen y el alt finales tras su aprobación explícita |
| Corregir ortografía o gramática | Aplicar directamente correcciones que no alteren el sentido |
| Revisar semántica | Proponer primero cambios que puedan alterar voz, tesis o intención |
| Revisar conceptos | Contrastar con el inventario y proponer la corrección con su evidencia |

- La revisión comprueba cada afirmación contra el inventario y vuelve a investigar si el texto introduce hechos nuevos.
- La revisión comprueba que las negritas permiten recorrer las ideas principales sin sustituir la lectura completa.
- Las afirmaciones sobre código abierto o el repositorio enlazan al origen canónico.
- Una corrección o revisión no cambia `author` salvo reescritura sustancial aprobada explícitamente.
- El artículo final debe cumplir el frontmatter, la accesibilidad, el SEO, el renderizado y las verificaciones técnicas del proyecto.
- No se contacta a terceros ni se publica fuera de Try and Catch como parte de la redacción o la revisión.
