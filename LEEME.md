# Constructorres · landing + CRM

- `/landing/` — funnel BANT. Cada lead se guarda en Supabase y abre WhatsApp con el perfil A/B/C.
- `/crm/` — CRM en tiempo real (Supabase Realtime): métricas, embudo, desgloses por UTM, estado y notas editables, exportar CSV. Acceso con email y contraseña, solo para emails habilitados en "Equipo con acceso".
- `config.js` — URL del proyecto Supabase, clave publicable y WhatsApp de los setters.
- `supabase.sql` — tablas y reglas de seguridad (RLS): la landing solo puede insertar; leer y editar, solo el equipo.

Links de anuncios con UTM: `/landing/?utm_source=meta&utm_campaign=inversion&utm_content=video1`
