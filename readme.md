
# Guía de instalación

## Guía rápida (resumen de pasos)

- **Verificar Node**: `node -v` y `npm -v`.
- **Instalar dependencias**: `cd carnet` luego `npm install`.
- **Arrancar Expo**: `npx expo start` o `npm start`.

## Instrucciones detalladas

**Instrucciones detalladas**

- **Verificar Node**:  
  - Abre `cmd.exe` y ejecuta:

    ```cmd
    node -v
    npm -v
    ```

  - Si ves versiones (por ejemplo `v18.x.x` y `9.x.x`), Node ya está instalado y puedes seguir.
  - Si no está instalado, opciones:
    - Descargar e instalar Node LTS : ir a <https://nodejs.org/> y descargar el instalador Windows LTS, después ejecutar el instalador.

- **Instalar dependencias del proyecto**:
  - En la raíz del proyecto ejecuta:

    ```cmd
    npm install
    ```

- **Arrancar Expo**:
- Para arrancar Expo  usa:

    ```cmd
    npx expo start
    ```

- Tambien puedes usar:

    ```cmd
    npm start
    ```

- **Qué esperar al arrancar**:
  - Se abre Expo DevTools en el navegador y la terminal muestra un QR.

  <img src="imagenes/Screenshot 2025-12-17 231908.png" width="300">

  - En la terminal puedes pulsar:
    - `a` → abrir en emulador Android (requiere Android Studio + adb)
    - `i` → abrir en simulador iOS (macOS solamente)
    - `r` → recargar la app
  - Opcion para abrir la app rápidamente:
    - instala la app <a href="https://expo.dev/client" target="_blank">Expo Go</a> (Android/iOS)
    - Escanea el QR para abrir la app.
    - Para esto tienes que estar dentro de la misma red que tu dispositivo.
