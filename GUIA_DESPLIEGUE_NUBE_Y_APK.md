# ⚜️ Guía Definitiva: Horizonte Pionero en la Nube & Creación de APK
### *El legado para la Unidad Pionera de Tarija — Asociación de Scouts de Bolivia*

Esta guía detalla los pasos para dejar la aplicación **100% autónoma, permanente y gratuita ($0/mes)**, de manera que tus Pioneros en Tarija puedan usarla tanto en campamentos sin señal como conectados a tu servidor en la nube cuando estés en La Paz.

---

## 🧭 Arquitectura del Sistema: ¿Cómo funciona?

1. **📱 En el Celular de los Pioneros (Tarija):**
   - **Modo Pionero Autónomo (100% Offline):** No requiere internet ni servidor. Pueden crear su perfil local, consultar las 65 especialidades oficiales de la ASB (con requisitos detallados), claves, nudos, amarres, técnicas de campismo y registrar sus noches y reflexiones directamente en la memoria del celular (`AsyncStorage`).
   - **Modo Sincronizado:** Cuando tienen señal WiFi o datos móviles, pueden conectarse a tu nube para sincronizar sus progresiones, subir fotos al *Libro de Oro* y enviar solicitudes de aprobación.

2. **☁️ En la Nube (24/7 Gratis):**
   - **Base de Datos:** MongoDB Atlas (Cluster M0 gratuito permanente).
   - **Servidor API:** Render.com (Plan Web Service gratuito con reinicio automático y HTTPS seguro).
   - **Tú como Dirigente (desde La Paz):** Puedes conectarte desde tu navegador o celular con tu cuenta de Dirigente para revisar las aprobaciones de progresión, ver las fichas médicas de emergencia de tus chicos y publicar eventos en el calendario.

---

## 🚀 PASO 1: Subir el proyecto a tu GitHub

El servidor gratuito de Render se conecta automáticamente a tu repositorio de GitHub para compilar y mantener vivo el backend.

Abre **PowerShell** en la carpeta principal del proyecto (`c:\Users\lucia\OneDrive\Documentos\horizonte-pionero-app-main`) y ejecuta:

```powershell
# 1. Iniciar el repositorio local
git init

# 2. Agregar todos los archivos preparados
git add .

# 3. Guardar el primer commit de lanzamiento
git commit -m "Lanzamiento Horizonte Pionero - Modo Autonomo y Soporte Nube"

# 4. Asegurarse de estar en la rama main
git branch -M main
```

Ahora ve a [GitHub.com](https://github.com), crea un nuevo repositorio llamado `horizonte-pionero` (puede ser Público o Privado), y ejecuta los comandos que te da GitHub (reemplazando `TU-USUARIO`):

```powershell
git remote add origin https://github.com/TU-USUARIO/horizonte-pionero.git
git push -u origin main
```

---

## ☁️ PASO 2: Desplegar el Backend en Render.com (Gratis)

1. Ingresa a [https://render.com](https://render.com) y crea tu cuenta gratuita (o inicia sesión con tu GitHub).
2. En el panel principal, haz clic en el botón azul **New +** y selecciona **Web Service**.
3. Selecciona **Build and deploy from a Git repository** y conecta tu repositorio `horizonte-pionero`.
4. Configura los siguientes campos:
   - **Name:** `horizonte-pionero-backend`
   - **Region:** `Oregon (US West)` o la más cercana
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** `Free` ($0/month)
5. En la sección **Environment Variables** (Variables de Entorno), añade estas claves:
   - `MONGODB_URI`: 
     ```text
     mongodb+srv://lucianomirandabustos_db_user:gk1n7HKA6UD9I9Me@cluster0.byf1cpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     ```
   - `DB_NAME`: `horizonte_pionero`
   - `MASTER_DIRIGENTE_KEY`: `ASB-HORIZONTE-2026`
   - `PYTHON_VERSION`: `3.11.9`
6. Haz clic en **Create Web Service**.
7. En unos 2 a 3 minutos, Render terminará la instalación y verás el mensaje **`Live`**.
8. Render te asignará una URL pública segura HTTPS, similar a:
   ```text
   https://horizonte-pionero-backend.onrender.com
   ```
   *(Pruébala abriéndola en el navegador; verás: `{"status":"online","app":"Horizonte Pionero API"}`)*.

---

## 🔗 PASO 3: Vincular la App Móvil con tu Servidor en la Nube

Una vez que tengas tu URL de Render:

1. Abre el archivo `frontend/.env` en tu editor.
2. Reemplaza la línea `EXPO_PUBLIC_BACKEND_URL` por la URL que te dio Render:
   ```env
   EXPO_PUBLIC_BACKEND_URL=https://horizonte-pionero-backend.onrender.com
   EXPO_USE_FAST_RESOLVER="1"
   ```
3. Guarda el archivo.

---

## 📦 PASO 4: Generar el archivo instalador APK para Android

No necesitas tener Android Studio ni una computadora potente; Expo compilará el archivo APK directamente en sus servidores en la nube.

1. Abre **PowerShell** y entra a la carpeta `frontend`:
   ```powershell
   cd c:\Users\lucia\OneDrive\Documentos\horizonte-pionero-app-main\frontend
   ```

2. Si aún no tienes cuenta en Expo, crea una gratis en [expo.dev/signup](https://expo.dev/signup).

3. Inicia sesión en tu terminal:
   ```powershell
   npx eas-cli login
   ```

4. Genera el APK ejecutable con este comando:
   ```powershell
   npx eas-cli build -p android --profile preview
   ```

5. El sistema te hará un par de preguntas automáticas:
   - *¿Generate a new Android Keystore?* -> Elige **Yes** (Enter).
6. EAS compilará el proyecto en la nube durante ~5 a 10 minutos.
7. Al terminar, la terminal te mostrará un **código QR y un enlace directo de descarga** para bajar el archivo `HorizontePionero.apk`.
8. ¡Listo! Puedes descargar ese APK y enviarlo por WhatsApp o Telegram al grupo de Pioneros de Tarija.

---

## ⚜️ PASO 5: Cómo usan la App tus Pioneros en Tarija

Cuando tus pioneros instalen el APK en sus teléfonos:

1. **Al abrir la app:**
   - En la pantalla principal verán la tarjeta destacada: **`MODO PIONERO · 100% AUTÓNOMO`**.
   - Tocan el botón: **`Crear perfil pionero local`**.
   - Escriben su Nombre, Patrulla (ej. *Halcones*, *Lobos*), Etapa (*Búsqueda, Encuentro o Desafío*) y datos de emergencia.
   - Tocan **Guardar y Comenzar**.

2. **Sin necesidad de internet (Offline total):**
   - **65 Especialidades Scouts:** Acceso instantáneo a las 6 áreas oficiales de la ASB con todos los requisitos y sub-especialidades.
   - **Técnicas y Claves:** Tablas de Morse, Semáforo, Murciélago, Nudos, Amarres y Tipos de Fogata.
   - **Referencias:** Ley, Promesa, Oración del Pionero, Carta de B-P y Virtudes.
   - **Bitácora y Campamentos:** Registran sus reflexiones y noches de campamento, que quedan guardadas en su teléfono para siempre.

3. **Conexión a la Nube (Opcional):**
   - Si desean conectarse a la red de la unidad para solicitar aprobación de insignias, pueden registrarse con su correo en el formulario de la app.

---

## 👑 PASO 6: Tu rol como Dirigente desde La Paz

Cuando te encuentres en La Paz:

1. Puedes abrir la app en tu teléfono o acceder desde la web al backend.
2. Inicia sesión como **Dirigente**:
   - Rol: `Dirigente`
   - Clave Maestra de Aprobación: `ASB-HORIZONTE-2026`
3. En la pestaña **Admin / Jefatura**:
   - Verás la **Bandeja de Aprobaciones** en tiempo real de lo que tus pioneros soliciten desde Tarija.
   - Podrás aprobar o dejar observaciones a sus avances de Patria, Progresión, Campamento y Servicio.
   - Podrás consultar las **Fichas Médicas** de toda la unidad ante cualquier campamento o emergencia.
   - Podrás subir nuevos eventos al **Calendario** de actividades de la unidad.

---

*¡Siempre Listos para Servir! Tu unidad pionera en Tarija tendrá en sus manos una herramienta moderna que preservará el espíritu scout más allá de la distancia.*
