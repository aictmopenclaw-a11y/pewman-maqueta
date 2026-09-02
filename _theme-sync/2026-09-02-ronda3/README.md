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

Las fichas de producto NO llevan Empresa B (decisión C): Crioprotect SAG + Ecocert, Nanoforte solo Ecocert (27 ago). Solo reciben los archivos nuevos por el reemplazo in-place.

## Verificado
- Checksums en Shopify = locales para los 7 archivos del theme.
- Preview por curl y en pantalla (escritorio + emulación móvil 375px): 3 sellos en Sostenibilidad, tarjeta Empresa B bajo CALS (Home) y bajo Premios (Nosotros), iconos + subtítulos en las 2 fichas con textos sin cambios, sin desborde horizontal (documento = 375px).
- Nota: capturas con Chrome headless a 390px muestran contenido cortado a la derecha desde Sostenibilidad hacia abajo. Es artefacto del headless (sin emulación móvil), no del sitio: la emulación real da `scrollWidth` = 375.
