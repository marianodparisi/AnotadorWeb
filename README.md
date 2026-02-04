<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1HTi-Wcu37raQTrE1-YljdnmYLdJNkylD

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`

## Deploy a Hostinger

### Opción A: Node.js (planes Business/Cloud)

1. En hPanel → Websites → Add Website → **Node.js Apps**
2. Conectá tu repo de GitHub o subí un `.zip` del proyecto
3. En Build settings, Hostinger debería detectar Vite automáticamente:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Start command:** `npm start` (sirve los archivos estáticos)
4. Deploy

### Opción B: FTP (hosting compartido)

1. Ejecutá localmente: `npm run build`
2. Subí todo el contenido de la carpeta `dist/` a `public_html/` por FTP
3. La app funciona como sitio estático (no requiere Node.js en el servidor)
