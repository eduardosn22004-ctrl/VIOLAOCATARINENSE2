import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    // Mudamos para 'hybrid' para que o site seja estático por padrão (mais rápido e gasta menos banda)
    output: 'hybrid', 
    
    adapter: vercel({
        webAnalytics: { enabled: true },
        // Configuração para otimizar suas imagens AVIF na infraestrutura da Vercel
        imagesConfig: {
            sizes: [320, 640, 1280, 1920],
            formats: ['image/avif', 'image/webp'],
            minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias de cache na CDN para as imagens
        }
    }),

    integrations: [react()],

    vite: {
        plugins: [tailwindcss()],
        build: {
            // Minifica o CSS e JS ao máximo para reduzir os 20MB do site
            cssMinify: 'lightningcss',
            chunkSizeWarningLimit: 500
        }
    }
});
