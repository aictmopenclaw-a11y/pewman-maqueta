# 2026-09-03 · Ronda 4 · mapa móvil · flecha "volver arriba" · logos en grilla · icono WhatsApp

Theme de trabajo: **`Pewman - 3sep mapa movil + flecha + logos + whatsapp`** (id 159080055015), duplicado del theme publicado "Pewman - Main" (159037915367) a las 13:49. El MCP no escribe en el theme MAIN, por eso se trabaja en la copia y Cris publica.

| Archivo | MD5 | Qué cambia |
|---|---|---|
| `sections/pewman-trust-map-split.liquid` | `4b44dd92602d9821d7191bbfa84a898c` | Móvil (≤820px): el mapa se muestra ENTERO a todo el ancho (`height:auto; object-fit:contain; min-height:0`); antes `cover` recortaba Canadá/Perú/Corea en los bordes. Setting nuevo `mobile_map_image` (opcional) con `<picture>/<source>` para una versión vertical con países más grandes. Base transcrita del live y verificada por MD5 (`c670ae75…`). |
| `sections/pewman-logo-strip.liquid` | `cb5fbf3c762c1359faddf179dd8b21cf` | Móvil (≤767px): grilla fija de N columnas (setting `mobile_columns`, 2 por defecto, opción 3) en vez del carrusel lateral; logos a 56px de alto máx. Escritorio sin cambios. |
| `sections/pewman-contact-info-form.liquid` | `2cd25f0ec5bc8625582d145163d76b6d` | Icono WhatsApp = glifo oficial (path de Simple Icons) relleno en `currentColor` (rojo de marca), 22px para que pese igual que los iconos de trazo. Base transcrita del live (`64ee187f…`). |
| `sections/pewman-back-to-top.liquid` | `df8426835d1df244ecc46bc38306e5ed` | NUEVA. Botón fijo abajo a la derecha (46px, rojo, flecha blanca), aparece tras `threshold` px de scroll (600 por defecto), scroll suave al inicio; escucha `.page-wrapper` (scroller real del theme) y `window`; respeta `prefers-reduced-motion` y `safe-area-inset-bottom`. Settings: umbral y color. |
| `sections/footer-group.json` | `665ba062e421e44acc2fe9dbc974be18` | Agrega `pewman_back_to_top` al grupo del footer (sale en todas las páginas sin tocar `layout/theme.liquid`). |

Verificado en preview (curl + emulación móvil 375px): grilla de logos 2×4, mapa 375×229 completo, botón `position:fixed` visible tras el scroll, glifo de WhatsApp presente y el compuesto viejo eliminado.

Nota: en el preview de Shopify la barra inferior "Draft" tapa el botón en las capturas; en producción no existe esa barra.
