# 2026-09-07 · Equipo + Raimundo Cubillos

Pedido: Denisse (correo del 3 sep reenviado por Dalila): "en la página no está Raimundo Cubillos. Ingeniero Civil Industrial y Encargado de Administración. Trabaja online". Foto por WhatsApp (1122×1600).

Theme destino: `Pewman - 3sep mapa movil + flecha + logos + whatsapp` (159080055015, sin publicar; ya trae la ronda 4). Un solo Publicar activa todo.

| Archivo | MD5 | Qué cambia |
|---|---|---|
| `raimundo-cubillos.jpg` (Files, MediaImage 40177843929319) | | v1: recorte cuadrado directo 1120×1120 desde la foto vertical (1122×1600). v2 (Cris: "no se ve bien... el resto se le ven los hombros"): la foto es una selfie de cerca — cabeza+mentón ocupan 920 de los 1122px de ancho disponible, así que un recorte cuadrado 1:1 solo con esos píxeles deja el mentón a los ~89% del cuadro, sin espacio para hombros. Se generó una tela más ancha extendiendo el fondo de la pared a cada lado (194px, con degradado calculado desde la franja segura de fondo real y costura suavizada) para poder usar el alto completo de la foto original (incluye la parte donde ya se ven los hombros/camisa) sin recortar nada del sujeto ni inventar cuerpo. Resultado: encabezado ~7%, mentón ~58%, hombros visibles — comparable a Safka/Felipe. Reemplazado `fileUpdate` in-place (misma referencia, el template no cambió). |
| `templates/page.equipo.json` (v3) | `ae0b6ea01de5717703108241f0b08309` | Bloque `e8` en el grupo "Equipo", entre Felipe Pávez (Director de ventas) y Javier Riveros (Asistente de Administración y Finanzas): nombre "Raimundo Cubillos", cargo "Encargado de Administración", credencial "Ingeniero Civil Industrial". 18 personas en total. |

"Trabaja online" no se muestra: las tarjetas no tienen campo de modalidad y ninguna otra lo indica.
