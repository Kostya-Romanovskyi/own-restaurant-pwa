import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Автоматическое обновление Service Worker
      devOptions: {
        enabled: true, // Включить PWA в режиме разработки
      },
      manifest: {
        name: 'ownRestaurantPWA',
        short_name: 'PWA',
        id: '/',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/own-restaurant-pwa/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/own-restaurant-pwa/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  base: '/own-restaurant-pwa/',
});
