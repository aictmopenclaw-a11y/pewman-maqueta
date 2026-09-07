# 2026-09-07 · Correcciones SEO · sin ningún cambio visible

Theme de trabajo: **`Pewman - 7sep SEO (noindex + datos empresa)`** (id 159171707111), duplicado del MAIN. Sin publicar.

Restricción de Cris: **"que no cambie nada del front end"**. Por eso solo se ejecutó lo invisible: lo que sale en Google, no en la página. Quedaron fuera los enlaces internos, ampliar textos y agregar la sección de preguntas frecuentes, que sí se verían.

## Ya en vivo (por API, no requieren publicar)

Seis títulos SEO. El theme agrega `– Pewman Innovation` salvo que el título ya contenga el nombre completo; como terminaban en `| Pewman` a secas, lo agregaba igual y quedaban sobre 75 caracteres. Google muestra unos 60.

| Página | Antes | Ahora | Total |
|---|---|---|---|
| Crioprotect | Crioprotect \| Protección biológica contra heladas \| Pewman | **Crioprotect: protección contra heladas** | 61 |
| Nanoforte | Nanoforte \| Nanotecnología para el estrés hídrico \| Pewman | **Nanoforte: estrés hídrico y sequía** | 59 |
| Blog artículos | Artículos y papers sobre agro y clima \| Pewman | **Artículos sobre agro, heladas y clima** | 60 |
| Art. resiliencia | Resiliencia climática 2026: triple mecanismo biotech \| Pewman | **Resiliencia climática 2026 en el agro** | 60 |
| Art. El Niño | El Niño 2026 y el agro chileno: heladas polares \| Pewman | **El Niño 2026 y las heladas en Chile** | 58 |
| Equipo | *(sin título propio: "Equipo")* | **Equipo científico y de investigación** | 60 |

De paso, el título de Crioprotect incorpora la frase exacta **"protección contra heladas"**, que no aparecía en ninguna parte del sitio.

## En el theme, esperando publicar

| Archivo | MD5 | Qué hace |
|---|---|---|
| `layout/theme.liquid` | `ee3887c32c0167b8038747ca29dd4fb0` | Dos bloques nuevos, nada más. |

**1. `noindex` en las dos URLs de fábrica de Shopify.** `/blogs/news` (blog vacío, en inglés, sin entradas) y `/collections/frontpage` (encabezado "Home page", duplica el Inicio). Siguen navegables; solo salen del índice de Google. Para quitar el noindex basta con sacar el handle de la lista.

**2. Ficha de empresa completa (Organization).** Shopify ya emitía un bloque básico. Este lo completa con `legalName`, `description`, `email`, `telephone`, `address`, `contactPoint`, `areaServed` (Chile, Perú) y `knowsAbout`, compartiendo el mismo `@id` para que Google los lea como una sola entidad. **Todos los datos salen de Configuración del tema → Pewman — Contacto**, así que se mantienen solos. No se declara fecha de fundación porque no está confirmada.

## Verificado
- `layout/theme.liquid` reconstruido sin mis bloques da MD5 `ac953afd7e4af44a1152a6cee23b1d4b`, **idéntico al original**: no se tocó nada más.
- Validador oficial de Schema.org sobre el Inicio: **0 errores, 0 advertencias**.
- `noindex` presente solo en las 2 URLs previstas; ausente en Inicio, producto y Nosotros.
- Texto visible **idéntico carácter por carácter** entre el theme en vivo y el nuevo, en Inicio, Crioprotect, Nosotros y Contacto.

## No ejecutado por la restricción de no tocar el front end
Enlaces internos hacia Patentes y Equipo · ampliar Patentes (252 palabras) y Equipo (269) · sección de preguntas frecuentes en las fichas (habilita resultados destacados) · sumar "ficha técnica" y "registro SAG" al texto de producto.

## Pendiente de dato del cliente
Fecha de fundación · si existe ficha técnica descargable · número de registro SAG · si el arándano entra en cultivos compatibles (preguntar a Alberto) · acceso a Search Console.
