# Constructorres · landing + CRM

- Landing: `/landing/` — funnel BANT, envía cada lead a la planilla y abre WhatsApp.
- CRM: `/crm/` — leads en tiempo real (se actualiza cada 10 s), métricas, embudo, desgloses por UTM, edición de estado y notas, exportar CSV. Protegido con clave.
- `config.js` — URL de la app web de Apps Script y WhatsApp de los setters.
- `apps-script-crm.gs` — código del backend en Google Sheets (la clave real no se sube al repo).

Links de anuncios con UTM: `/landing/?utm_source=meta&utm_campaign=inversion&utm_content=video1`
