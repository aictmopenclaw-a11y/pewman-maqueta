# 2026-09-07 · Auditoría "100% administrable" · ronda 1

Theme de trabajo: **`Pewman - 7sep 100% administrable`** (id 159164399847), duplicado del MAIN. Sin publicar.

Objetivo: que el cliente pueda cambiar todo desde Shopify, sin tocar código. Se auditaron las **43 secciones** del theme buscando texto e info de negocio escritos a fuego.

## Regla usada
Cada cambio deja el texto actual como `| default:`, así **el sitio se ve exactamente igual** y el campo queda editable. Verificado por curl: Contacto, Crioprotect y Nosotros idénticos.

## Corregido en esta ronda

| Archivo | MD5 | Qué queda editable |
|---|---|---|
| `config/settings_schema.json` | `f3628d43480bdad7d4035a395c57f4c8` | Configuración del tema → Pewman — Contacto suma: **Teléfono como se muestra**, **Correo de contacto**, **Razón social** y las 4 **redes sociales**. |
| `sections/pewman-contact-info-form.liquid` | `ca1f760956d58dfeb076679eb2e926ad` | Correo, razón social y redes salían del código. Además **bug corregido**: el teléfono mostraba `56990833908` sin formato (usaba el campo de WhatsApp, que guarda solo dígitos). Si una red queda vacía, desaparece del listado. |
| `sections/pewman-product-mechanism.liquid` | `974b642e701b6c3b32864eca96ab0a11` | Antetítulo «¿Cómo funciona?». |
| `sections/pewman-product-pdp.liquid` | `d29734dbc5bae399d27aea275df3f308` | «Elige tu formato». |
| `sections/pewman-results-split.liquid` | `9ad2a350d8b95db7af1728afd39a2c13` | Antetítulo «Validado en campo». |
| `sections/pewman-trials-documented.liquid` | `c705a631c56b44fb22b3f9a820fa6c41` | «Informe técnico» y el botón «⬇ Descargar PDF». |
| `sections/pewman-ods.liquid` | `cedd0039a3616439c15aa5666c07af99` | Los 4 títulos de la ventana de cada ODS: Objetivo, Nuestra contribución, Metas alineadas, Impacto medible. |

## Criterio acordado con Cris (7 sep)
- Si el texto va **dentro de una imagen** (banner CALS, banner "Origen chileno"): basta con poder cambiar la imagen. Ya se puede.
- **Texto real, formularios, prender/apagar cosas, equipo, productos**: todo editable desde el panel, sin llamar a la agencia.

## Ronda 2 (mismo theme 159164399847)

| Archivo | MD5 | Qué queda editable |
|---|---|---|
| `sections/pewman-contact-form.liquid` | `a1d233f680cf4d94f79cb065aded5750` | **Productos del desplegable ahora dinámicos** (lista los productos activos de la tienda: un producto nuevo aparece solo) + opción extra («Ambos») editable. Etiquetas, ejemplos, botón y mensaje de gracias. |
| `sections/pewman-cals-distributor-banner.liquid` | `a7d7f72cbd75ed05f0f678ba964cd95a` | Todos los textos de la ventana (antetítulo, título, párrafo, pregunta de zona, campos, botón, mensajes de éxito y botón a CALS). El link general reutiliza el setting `cals_url` que ya existía. |
| `sections/pewman-product-guide-gate.liquid` | `ab7d462a05fd31226797b0d74c9f9b8c` | Antetítulo, título, portada (título/bajada), etiquetas y ejemplos del formulario, textos de éxito, botón de descarga, texto si no hay PDF. Los productos ya eran dinámicos. |
| `sections/pewman-product-crops.liquid` | `44a2291a5432837f5c1022c7b3b92a16` | Antetítulo «Compatibilidad». |
| `sections/pewman-solutions-grid.liquid` | `3d036d70ff20de4443ba196e3d40bc9d` | «Desde» y «Ver producto». |
| `sections/pewman-blog-list.liquid` | `d1a3f15ff0e908aa924c086b04e05f68` | «Leer →» y texto cuando no hay entradas. |
| `sections/pewman-blog-cards.liquid` | `b89eb5adb4d0cc27f1c6eb276528720b` | Texto cuando no hay entradas. |
| `sections/pewman-papers-list.liquid` | `24430ea75e9e126039b5d5e932b7e31d` | «Leer →». |
| `sections/pewman-testimonials-video-grid.liquid` | `9589e1912a0e29c3e22b8915055e8408` | Casilla para prender/apagar las 5 estrellas. |
| `sections/pewman-footer.liquid` + `sections/footer-group.json` | `d71166fce9f3171af351bfd5319f5db6` / `931e953fbdaa196c0181b728ec48528d` | Dirección con una sola fuente: el pie hereda la de Configuración del tema si su campo queda vacío. **Cris confirmó of. 708**; el 726 del pie era un default viejo. |

Verificado por curl en el preview: Home (formulario con Crioprotect/Nanoforte/Ambos, ventana CALS), Crioprotect (guía, cultivos), Casos (estrellas), Patentes (Leer →), Contacto y pie (708). Todo idéntico a lo publicado.

**Lección:** `themeFilesUpsert` por URL rechaza en silencio un archivo con un id de setting duplicado (pasó con `cals_url`, que ya existía). Antes de agregar settings, listar los ids existentes del schema. El checksum posterior es lo que delata el rechazo.

## Queda fijo a propósito
Solo microcopy sin valor de negocio: el símbolo «✓» de los mensajes de éxito, los menús técnicos de Shopify.
