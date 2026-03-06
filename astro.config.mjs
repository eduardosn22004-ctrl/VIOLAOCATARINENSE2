import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless';
import netlify from '@astrojs/netlify';

// Verifica se está rodando na Vercel
const isVercel = process.env.VERCEL === '1';

export default defineConfig({
    // No Astro 5, usamos 'static' (padrão). 
    // Para rotas dinâmicas, usamos 'export const prerender = false' na própria página.
    output: 'static',

    adapter: isVercel 
        ? vercel({
            webAnalytics: { enabled: true },
            imagesConfig: {
                sizes: [320, 640, 1280, 1920],
                formats: ['image/avif', 'image/webp'],
                minimumCacheTTL: 60 * 60 * 24 * 30,
            }
        }) 
        : netlify({
            devFeatures: {
                environmentVariables: true
            }
        }),

    integrations: [react()],

    vite: {
        plugins: [tailwindcss()],
        build: {
            cssMinify: 'lightningcss',
            chunkSizeWarningLimit: 500
        }
    }
});
