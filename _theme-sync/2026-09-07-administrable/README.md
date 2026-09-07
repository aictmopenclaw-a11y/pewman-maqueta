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

## Pendiente de decisión (ronda 2)

**Copy de marketing todavía fijo en el código:**
- `pewman-cals-distributor-banner`: todo el texto del banner y su ventana («Distribuidor oficial», «Conecta con tu distribuidor CALS», el párrafo, «¿En qué zona está tu campo?», «Ir a CALS», los mensajes de éxito).
- `pewman-product-guide-gate`: «Descarga la guía de aplicación», «Guía de aplicación», «y preguntas frecuentes», mensajes de éxito.
- `pewman-product-crops`: antetítulo «Compatibilidad».
- `pewman-contact-form` y el gate: etiquetas de los campos y las opciones de producto («Crioprotect», «Nanoforte»): si suman un producto, no aparece solo en el desplegable.

**Microcopy de interfaz** (se puede dejar fijo sin problema, salvo que quieran multi-idioma): «Leer →», «Ver impacto +», «Desde», «★★★★★», mensajes de estado vacío.

## Dato inconsistente que hay que resolver con el cliente
La dirección aparece distinta en dos lugares: **of. 708** en la página de Contacto (viene del ajuste global) y **of. 726** en el pie de página (campo propio del footer). Hay que confirmar cuál es la correcta y dejarla en los dos. Ojo: la dirección se guarda en dos campos distintos; conviene unificar.
