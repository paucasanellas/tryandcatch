# GitHub Project

Cómo priorizar, estimar y ejecutar las issues del GitHub Project 12.

## Campos obligatorios

**Toda issue debe tener `Priority` y `Estimate` desde que se añade al Project.**

- Si falta información para estimar, se elige el valor superior.
- La estimación expresa tamaño relativo, no horas ni días.
- La escala de `Estimate` es `1`, `2`, `3`, `5` y `8`.
- Una issue mayor que `8` se divide antes de empezar.

## Prioridad

| Valor | Uso |
|---|---|
| `low` | Puede posponerse sin afectar al trabajo planificado. |
| `medium` | Trabajo normal sin urgencia ni bloqueo inmediato. |
| `high` | Impacto importante o dependencia próxima que requiere atención preferente. |
| `xhigh` | Trabajo urgente o bloqueante que debe adelantarse a `high`. |
| `critical` | Incidente o bloqueo crítico que debe atenderse antes que cualquier otra prioridad. |

**El orden de ejecución es `critical`, `xhigh`, `high`, `medium` y `low`.** Dentro de una misma prioridad se elige primero la issue que desbloquea más trabajo; si empatan, la más antigua.

## Flujo

1. Añadir la issue al Project 12 si todavía no pertenece a él.
2. Asignar `Priority` y `Estimate`.
3. Elegir trabajo respetando el orden de prioridad.
4. Mover la issue elegida a `In Progress` antes de investigar, documentar o modificar archivos.
5. Mantenerla en `In Progress` hasta que el trabajo termine.
