# 2026-09-02 · Equipo a página propia

Theme destino: `Pewman - sellos color + nitidez (1sep)` (id 159037915367, sin publicar).
Verificado por checksum: ese theme = live (159013437671) + 2 archivos de sellos. Se construyó encima.

| Archivo | MD5 | Qué cambia |
|---|---|---|
| `templates/page.equipo.json` | `935a06fd6179aece8e91e3ce4469fd5a` | NUEVO. Hero estilo título (como Patentes y papers) + la sección `pewman_equipo` migrada intacta (17 personas, 5 grupos). Eyebrow pasa de "Equipo" a "Nuestra gente" para no repetir el H1; el subtítulo sube al hero. |
| `templates/page.empresa.json` | `eae25fac97d3a6bd184d362279bcf96a` | Solo se quita `pewman_equipo` (236 líneas eliminadas, 0 agregadas). Diff contra el live: quirúrgico. |

Página Shopify: `/pages/equipo` (handle `equipo`, template suffix `equipo`).

Secuencia pendiente:
1. Cris revisa en preview del theme 159037915367.
2. Cris publica el theme.
3. Recién ahí se agrega "Equipo" al menú `main-menu` (Nosotros ▾, entre "Nosotros" y "Patentes y papers"). El menú se aplica al instante en la web viva, por eso va al final.


**Actualización 20:14:** `page.equipo.json` reemplazado por la v2 (MD5 `9e58d99dc8913a2733cea07a4a3b3574`, en `../2026-09-02-ronda3/`): un solo encabezado, la sección con `show_heading: false`. La v1 de esta carpeta queda solo como historial.
