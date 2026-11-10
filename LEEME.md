# Landing Constructorres · cómo publicarla (10 minutos)

## 1. CRM en Google Sheets
1. Crear una planilla nueva: "CRM Leads Constructorres".
2. Extensiones > Apps Script > borrar todo y pegar `apps-script-crm.gs` > Guardar.
3. Implementar > Nueva implementación > Tipo: App web. Ejecutar como: Yo. Acceso: Cualquier usuario. Autorizar.
4. Copiar la URL que termina en `/exec`.
5. Abrir `index.html`, buscar `SHEET_WEBHOOK = ""` y pegar la URL entre las comillas.

Cada formulario completo suma una fila en la hoja "Leads" con BANT, puntaje, perfil A/B/C y UTM de la campaña.
Columna "estado": la mueven los setters (Nuevo > Contactado > Reunión > Firmó / Descartado).

## 2. Publicar
**Opción rápida (Netlify):** entrar a app.netlify.com/drop, crear cuenta gratis y arrastrar la carpeta. Da un link público al instante.
**Opción Vercel:** vercel.com > Add New > Project > subir la carpeta (o desde un repo de GitHub). Framework: Other.
Después conectar el dominio, por ejemplo invertir.constructorres.com.ar.

## 3. Antes de la pauta (20/11)
- Cambiar `WA_NUMBER` en index.html por el WhatsApp de los setters.
- Pegar el píxel de Meta donde dice "Meta Pixel" en el `<head>`. El formulario ya dispara el evento `Lead`.
- Usar links con UTM en los anuncios: `?utm_source=meta&utm_campaign=inversion&utm_content=video1`.
- Reemplazar los 4 videos "próximamente" por los testimonios (con autorización firmada).
- Validación legal de textos antes de pautar.
