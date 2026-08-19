# Nuxt UI

Norma primordial e innegociable: la UI se construye sobre Nuxt UI.

- **Siempre primero Nuxt UI. Antes de escribir un componente manual, buscar el equivalente en la skill `nuxt-ui`: no reinventar la rueda.**
- Los componentes `U*` se usan directamente en páginas, layouts y componentes de dominio. Nada de wrappers intermedios: una capa passthrough solo añade fricción (defaults pisados, v-model que no sube, genéricos duplicados).
- El root de toda página es `UPage`.
- Estilo: `app.config` primero (ver `app-config.md`). El prop `ui` inline solo para un ajuste puntual de una instancia; si se repite, va a la config global.
- Componente propio solo cuando la librería no tiene equivalente ni composición razonable.
- Nunca reimplementar un componente de la librería para cambiarle el estilo.
