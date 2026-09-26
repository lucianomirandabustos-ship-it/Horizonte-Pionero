# Horizonte Pionero — PRD (Fase 3)

## Producto
App móvil (Expo + React Native) **Horizonte Pionero** para la Rama Pioneros ASB. Utilidades offline, RBAC (Pionero/Dirigente), Libro de Oro compartido, Itinerario editable por dirigentes, y ahora:
- **Credencial de Guía ASB** subida por el dirigente y visible al aprobar.
- **Racha de Campamento 2026** con progreso 0-15 noches y registro con aprobación diferida.
- **Notificaciones in-app** (banner persistente + toast animado) al aprobar/rechazar.
- **Directorio de sedes cerradas Tarija-Cercado** + primeros auxilios básicos + acceso al sitio Tribu Tierra ASB.

## Fase 3 — Detalles
### Credencial de Guía ASB (Dirigente)
- En "Más" (ficha del dirigente) card **Credencial de Guía ASB** con badge del estado (rojo si falta, verde si cargado) y botón "Subir credencial ASB" (`expo-image-picker` → `/api/upload` con `purpose="credential"` → `PUT /api/profile` con `credential_doc_path`).
- En el Panel de Jefatura aparece un banner recordatorio si aún no hay credencial; al aprobar, el approval guarda de manera denormalizada `reviewer_credential_code` y `reviewer_credential_doc_path` para trazabilidad futura.

### Racha de Campamento (Pionero)
- Card destacada en la ficha del Pionero: título "Racha de Campamento · Gestión 2026", contador **X / 15 noches**, barra ámbar, y últimos 3 registros con su estado (pendiente/aprobado/rechazado).
- Botón "Registrar campamento" → modal con `place`, `date`, `nights`. Al enviar, suma inmediatamente al contador local y crea approval `kind="camping"` en la bandeja del Dirigente. Al aprobar, marca el registro como `aprobado`.

### Notificaciones in-app (Pionero)
- Polling cada 15 s de `/api/approvals/mine`.
- Banner persistente en la parte superior del scroll con la decisión más reciente (verde=aprobado, rojo=rechazado con nota) + contador "+N más". Toca la banner para ir a la sección relevante y se marca todo como visto.
- **Toast animado** aparece al detectar un cambio nuevo (2.6 s).
- Los IDs vistos se persisten en `expo-secure-store` por usuario (`horizonte.notif.seen:<userId>`).

### Directorio Tarija + Primeros Auxilios + Tribu Tierra
- Modal "Sedes Tarija" (tarjeta en Home + botón en "Más"):
  - 5 sedes precargadas (Bicentenario, San Jacinto, García Agreda, San Lorenzo, Polideportivos Educativos) con dirección, zona, features, contacto.
  - Cada sede: botón "Ver en mapa" (Apple Maps / geo: / Google Maps según plataforma) y "Copiar dirección" (`expo-clipboard`).
  - Sección **Primeros Auxilios** con 6 fichas: cortes, quemaduras, esguince R.I.C.E., picaduras, insolación y botiquín scout esencial.
  - Sección **Tribu Tierra ASB** con enlace externo oficial: `https://sites.google.com/view/asb-tributierra/tribu-tierra?pli=1&authuser=0`.

## Backend
Nuevos endpoints y modelos:
- `PUT /api/profile` acepta `credential_doc_path`.
- `POST /api/approvals/request` acepta `kind="camping"` con `nights`, `date`, `place`.
- `POST /api/admin/approvals/{id}/decide` denormaliza `reviewer_credential_code` / `reviewer_credential_doc_path`.
- `state.camping_log[]` en Mongo por usuario.

## Cuentas QA (`/app/memory/test_credentials.md`)
- Pionero: `pionero.qa@example.com` / `Agenda123!`
- Dirigente admin: `admin.qa@example.com` / `Admin123!` (usar `MASTER_DIRIGENTE_KEY=ASB-HORIZONTE-2026` en registro de nuevos admins).

## Componentes frontend nuevos
- `src/components/TarijaVenuesModal.tsx`
- `src/components/CampingRegisterModal.tsx`
- `src/components/NotificationBanner.tsx` (banner + toast + helpers)
- `src/data/tarija.ts` (sedes, primeros auxilios, URL Tribu Tierra)

## Historial de fases
- **Fase 1**: Progresión Personal + Claves Scout + Cabuyería + PDF viewer.
- **Fase 2**: RBAC, aprobación online Patria/Progresión, Libro de Oro, Itinerario, Object Storage.
- **Fase 3**: credencial dirigente, racha de campamento, notificaciones in-app, directorio Tarija + primeros auxilios + Tribu Tierra.
- **Fase 4**: referencias esenciales clickeables, videos YouTube en cabuyería, Libro de Oro accesible desde Bitácora, ficha médica ampliada.
- **Fase 5 (actual)**: imágenes reales para 5 claves visuales (Semáforo, Siete Cruces, Agujerito, Tierra-Aire, Sordomudo) servidas desde `/api/claves/{kind}`; UI de Cabuyería limpiada; Servicio a la Comunidad con horas + aprobación online del Dirigente; Campismo con 5 fogatas (Pirámide, Pagoda, Reflector, Zanja, Estrella) y 4 refugios (A, Cobertizo, Naturales, Tarp); copy neutralizado quitando referencias a marcas específicas.

## Roles y verificación
- **Pionero (Beneficiario)**: registro con nombre, grupo, patrulla y etapa (Búsqueda/Encuentro/Desafío). Puede logear objetivos, solicitar aprobaciones y subir al Libro de Oro.
- **Dirigente / Guía ASB**: registro con nombre, grupo y código de credencial. Al enviarse queda en `verification_status="en_revision"` salvo que ingrese la **clave maestra** (`MASTER_DIRIGENTE_KEY`, env var — actual: `ASB-HORIZONTE-2026`) que lo auto-verifica. Los dirigentes verificados aprueban a los pendientes desde el Panel de Jefatura.

## Sistema de aprobación online
- **Objetos aprobables**: los 15 puntos "Scout de la Patria" y los objetivos de Progresión Personal.
- **Flujo Pionero**: en la pantalla del ítem toca "Solicitar aprobación" → el estado local pasa a `pendiente` (badge ámbar).
- **Flujo Dirigente**: el Panel de Jefatura muestra la Bandeja de aprobaciones con polling cada 10 s. Puede escribir nota de retroalimentación y elegir **Aprobar** (dorado) o **Rechazar** (rojo).
- **Al aprobar**: el punto Patria queda `true` con badge verde; el objetivo de Progresión pasa a `aprobado`.
- **Al rechazar**: pasa a `rechazado`, la nota aparece bajo el ítem y el Pionero puede volver a solicitar.

## Libro de Oro (galería compartida)
- Feed cloud visible para todos los miembros con sesión. Sin moderación (recuerdos de la unidad).
- Subida vía `expo-image-picker` → upload a Emergent Object Storage → publicación con caption.
- Cada post muestra patrulla + nombre del autor. Puede borrarse por el autor o por cualquier dirigente.

## Itinerario
- Dirigentes verificados publican actividades desde el Panel (Título, Fecha, Hora, Lugar, Descripción, lista de Equipo).
- Todos los usuarios ven el feed en modo lectura y activan un **checklist personal** persistente (guardado local) por evento para su equipo.

## Backend (`/app/backend/server.py`)
Nuevos endpoints:
- `POST /api/auth/register` con `role`, `group_number`, `patrol`, `stage`, `credential_code`, `master_key`.
- `POST /api/upload` (multipart) y `GET /api/files/{path}` (token en query o header).
- `POST /api/approvals/request` · `GET /api/approvals/mine`.
- `GET /api/admin/approvals/inbox` · `POST /api/admin/approvals/{id}/decide`.
- `GET /api/admin/dirigentes/pending` · `POST /api/admin/dirigentes/{id}/approve|reject`.
- `GET|POST /api/gallery` · `DELETE /api/gallery/{id}`.
- `GET|POST /api/calendar` · `DELETE /api/calendar/{id}`.

Colecciones nuevas: `approvals`, `gallery`, `calendar`, `uploads` (índices únicos por `path`, `approval_id`, etc.).

## Integraciones
- **Emergent Object Storage** para fotos del Libro de Oro y documentos futuros del Registro ASB. La clave `EMERGENT_LLM_KEY` vive sólo en `backend/.env`; el frontend nunca la toca.
- Emergent-managed Google Auth existente.

## UI / Tema
- Paleta oficial: Deep Purple `#1C0B2B` / Dark Violet `#2A123D` / Pionero Red `#D62828` / Amber Gold `#F4A261`.
- Badges: verde `success` = aprobado, ámbar `brandSecondary` = pendiente, rojo `error` = rechazado.
- Home muestra hero adaptativo según rol (Pionero vs. Dirigente) y tarjetas rápidas para Patria, Progresión, Claves, Cabuyería, Libro de Oro, Itinerario, Ficha y (si Dirigente verificado) Panel de Jefatura.

## Testing manual verificado
- Registro Dirigente con clave maestra → verificado (`admin.qa@example.com`).
- Pionero solicita aprobación de un punto → aparece en bandeja del Dirigente en ≤ 10 s.
- Dirigente aprueba → punto queda verde en la vista del Pionero (2/15, 13%).
- Home muestra tarjeta "Panel de Jefatura" para el Dirigente.

## Arquitectura frontend
- `/app/frontend/app/index.tsx`: shell auth + Home/Patria/Bitácora/Más, integra todos los modales.
- `/app/frontend/src/components/AdminPanel.tsx`: bandeja de aprobaciones + Dirigentes pendientes + Itinerario admin.
- `/app/frontend/src/components/LibroDeOroModal.tsx`: galería compartida (image picker + upload).
- `/app/frontend/src/components/ItinerarioModal.tsx`: feed + checklist de equipo persistente.
- `/app/frontend/src/components/ProgresionModal.tsx`: CRUD de objetivos + "Solicitar aprobación".
- `/app/frontend/src/components/ToolsModal.tsx`: Claves + Cabuyería (Fase 1).
- `/app/frontend/src/data/*.ts`: catálogos de claves, cabuyería, progresión, patria.

## Cuentas QA
Ver `/app/memory/test_credentials.md`.
