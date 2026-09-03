# 2026-09-02 · Ronda 3 · 3 sellos juntos · iconos triple mecanismo · bloque Empresa B

Theme destino: `Pewman - sellos color + nitidez (1sep)` (id 159037915367, sin publicar). Es el MISMO theme que lleva los sellos a color (1sep) y el Equipo en página propia (2sep): un solo Publicar activa todo.

## Archivos (Shopify Files)
| Archivo | Cómo | MediaImage | Tamaño |
|---|---|---|---|
| `pewman-logo-sag-organico.png` | `fileUpdate` in-place (misma referencia, cambia en los 3 sitios de una vez) | 39883715051751 | 466×600 |
| `pewman-logo-ecocert-insumos.png` | `fileUpdate` in-place | 39883715084519 | 691×600 |
| `pewman-logo-empresa-b.png` | `fileCreate` (nuevo) | 40148593541351 | 364×600 |
| `pewman-icono-crio-{biologico,fisico,sistemico}.png` | `fileCreate` | 40148593574119 / …606887 / …639655 | 512×512 |
| `pewman-icono-nano-{nanoburbujas,consorcio,nanobiopolimeros}.png` | `fileCreate` | 40148593672423 / …705191 / …737959 | 512×512 |

Sellos: recortados al contenido (los originales traían 86-95% de aire) y balanceados en lienzo de 600px de alto (SAG 100%, Empresa B 100%, Ecocert 76%) para que pesen parejo. Iconos: trazo blanco sobre transparente, centrados en lienzo cuadrado 512 (icono a 440 máx) para que todos ocupen la misma caja.

Mapeo de iconos (decisión Cris, pregunta B): Biológico = bacteria (7.png) · Físico = cadena de nanobiopolímeros (6.png) · Sistémico = molécula (8.png). En la referencia venían cruzados igual que los textos viejos.

## Theme (secciones → luego templates, por el orden de dependencias)
| Archivo | MD5 final | Qué cambia |
|---|---|---|
| `sections/pewman-sustainability.liquid` | `9790f6b7cca48689309a291071da472d` | `cert_logo_3` (schema + markup) + media query ≤560px: etiqueta en su propia línea, logos a 62px (a 390px el tercer sello quedaba cortado). |
| `sections/pewman-product-mechanism.liquid` | `bef81154c36744a32d2f910a9ed0352a` | Block settings `icon` + `subtitle`. Con icono: icono 64px arriba, título "N. TÍTULO" en mayúsculas (número inline, sin recuadro), subtítulo en negrita. Sin icono: se mantiene el recuadro numerado. |
| `sections/pewman-bcorp.liquid` | `5d9392110f45a648ac9a0dd440925429` | NUEVA. Sello + texto en tarjeta con el estilo exacto de `.pewman-ae__top-card` (gradient blanco→crema, borde 1px, radio 26, `--pewman-sh`). Apilada y centrada en ≤700px. |
| `templates/page.empresa.json` | `15a2420ced52b0630e2a5e941a04d81d` | `cert_logo_3` en Sostenibilidad + sección `pewman_empresa_b` entre premios y patentes. |
| `templates/index.json` | `8f0b679ec613aaa9277d3df88d567219` | `pewman_empresa_b` entre `pewman_cals` y `pewman_prensa`. |
| `templates/product.crioprotect.json` | `1a07349944dbcf38375876fe06bc31a8` | icon + subtitle por bloque; textos INTACTOS (los de la web, decisión A). Subtítulos: Bacterias Antárticas · Nanobiopolímeros · Anti-Estrés Abiótico. |
| `templates/product.nanoforte.json` | `378ff3f79ee662413d76b218a53c5acf` | icon + subtitle; textos intactos. Subtítulos: (sin) · Microorganismos y nutrición · Resistencia a estrés hídrico. |
| `sections/header-group.json` | `399b275c730545f6ef7afca9cbe2a177` | `menu: main-menu-equipo` (menú COPIA de `main-menu` + ítem "Equipo" → `/pages/equipo` entre "Nosotros" y "Patentes y papers"; gid Menu 253667049703). Así "Equipo" se ve en el preview y se activa al publicar, sin tocar la web viva. |
| `sections/pewman-team-grid.liquid` | `98e8dba1331fe8f36bdc232465111a9f` | Setting `show_heading` (default true). Apagado, no pinta el encabezado interno y el padding superior baja de 78 a 34px. Base transcrita del espejo y verificada por MD5 (`eb3ef614…`); la copia en `_theme-sync/sections/` estaba desactualizada. |
| `templates/page.equipo.json` (v2) | `9e58d99dc8913a2733cea07a4a3b3574` | Un solo encabezado (Cris: "título doble, resuélvelo mejor"): hero H1 "Equipo" + bajada "Fundado por científicos. Un equipo de investigadores, ingenieros y agrónomos con base en Chile, Perú y Europa."; sección con `show_heading: false`, `subtext: ""` (ojo: quitar la clave NO basta, cae al default del schema). |
| `sections/pewman-sustainability.liquid` (v3, 3 sep) | `e42793e5db0c8084037bbcb98c9060f2` | Grilla de documentos con tope de 350px por tarjeta y centrada: con 2 reportes no se estiran (con 3 se veía igual que antes). |
| `templates/page.empresa.json` (v3, 3 sep) | `5209c4bd584413ffd4682d472609e11f` | Documentos y reportes: se elimina `d3` (copia del primero, confirmado por MD5 y por Denisse); `d1` "Reporte de validación" · meta "Validado por Impact Forecast (Alemania) · 2025 · PDF · 26 págs"; `d2` "Huella de carbono (CO₂)" · meta "Validado por Louis Dreyfus Company (LDC), Suiza · PDF · 19 págs". Fuente: Denisse vía Dalila (3 sep). |

Las fichas de producto NO llevan Empresa B (decisión C): Crioprotect SAG + Ecocert, Nanoforte solo Ecocert (27 ago). Solo reciben los archivos nuevos por el reemplazo in-place.

## Verificado
- Checksums en Shopify = locales para los 7 archivos del theme.
- Preview por curl y en pantalla (escritorio + emulación móvil 375px): 3 sellos en Sostenibilidad, tarjeta Empresa B bajo CALS (Home) y bajo Premios (Nosotros), iconos + subtítulos en las 2 fichas con textos sin cambios, sin desborde horizontal (documento = 375px).
- Nota: capturas con Chrome headless a 390px muestran contenido cortado a la derecha desde Sostenibilidad hacia abajo. Es artefacto del headless (sin emulación móvil), no del sitio: la emulación real da `scrollWidth` = 375.

## Menú: limpieza después de publicar
El theme apunta a `main-menu-equipo` (copia). Cuando el theme esté en vivo: agregar "Equipo" a `main-menu` (el que edita Dalila en Navegación), volver a apuntar `header-group.json` a `main-menu` y borrar `main-menu-equipo`. Hasta entonces, cualquier cambio de menú hay que hacerlo en la copia.
