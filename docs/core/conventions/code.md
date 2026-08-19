# Código

Convenciones de código del proyecto.

- **El código no lleva comentarios**: el código se explica solo; lo que necesita explicación se reescribe.
- Única excepción: **un workaround, siempre asociado a un `TODO`** que explique por qué existe y cuándo podrá eliminarse.
- **Los tipos compartidos viven en `shared/types/`**, un fichero por concepto (`shared/types/navigation.ts`); están disponibles por auto-import, sin importarlos a mano.
