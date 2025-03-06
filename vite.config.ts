import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'OwnRestaurant',
        short_name: 'OwnRestaurant',
        id: '/',
        scope: '/',
        start_url: '/own-restaurant-pwa/',
        display: 'standalone',
        background_color: 'transparent',
        theme_color: '#000000',
        icons: [
          {
            src: '/own-restaurant-pwa/sushi-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/own-restaurant-pwa/sushi-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  base: '/own-restaurant-pwa/',
});
