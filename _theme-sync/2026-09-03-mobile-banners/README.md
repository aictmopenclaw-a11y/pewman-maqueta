# 2026-09-03 · Banners del Home en versión móvil (CALS + "Origen chileno. Alcance global")

Theme destino: `Pewman - sellos color + nitidez (1sep)` (159037915367, sin publicar). Mismo theme de todo lo anterior.

Cris mandó 50.png (CALS) y 51.png (global) en vertical 370×500 para que los banners "se vean perfecto en mobile". Los dos banners son imágenes con el texto incrustado, así que la solución correcta es **dirección de arte con `<picture>`**: un `<source media="(max-width: 767px)">` con la imagen vertical y el `<img>` horizontal de siempre como fallback. El navegador descarga solo la que corresponde, sin cambio de layout.

| Archivo | MD5 | Qué cambia |
|---|---|---|
| `sections/pewman-cals-distributor-banner.liquid` | `474677f6ef8c252febecf9911ffb3505` | Setting `mobile_image` + `<picture>` en las 2 salidas (botón modal y link directo) + `picture { display:block; line-height:0 }`. |
| `sections/pewman-image-banner.liquid` | `5482b87d8f1ee8ae7588cf6b50a72f72` | Setting `mobile_image` + `<picture>` en las 2 salidas (con link y sin link). |
| `templates/index.json` | `484037f5749ba40eee889ed6e1bccca5` | `mobile_image` en `pewman_cals` y `pewman_banner_global`. |

Shopify Files (`fileCreate`, RAISE_ERROR): `pewman-banner-cals-mobile.png` (MediaImage 40150909059303) y `pewman-banner-global-mobile.png` (40150909092071), ambos 370×500.

## ⚠️ Resolución
370×500 es 1x. En un teléfono (DPR 2-3) la imagen se muestra a ~375-430px CSS, o sea el navegador la escala 2-3 veces: el texto se verá blando, justo el problema "pixelado" del 27 ago. Hay que exportar desde Canva a **2x o 3x (750×1000 mínimo, ideal 1110×1500)** y reemplazar los 2 archivos **en su lugar** con `fileUpdate` (misma referencia, cero cambios de código). El `srcset` 480/800/1200 ya está preparado para eso. NO usar upscaling con IA: destruye el texto (lección 31 ago).
