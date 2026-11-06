import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest:{
    "name": "Attire",
    "short_name": "Attire",
    "description": "Attire - Professional Marketplace",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "icons":[
    {   "src": "/icons/iconAttire.png",
        "sizes": "192x192",
        "type": "image/png"
    },
    ],
    },
    })
  ],
  server: {

    allowedHosts: ['tubular-playpen-unknown.ngrok-free.dev']
    
  }
});
