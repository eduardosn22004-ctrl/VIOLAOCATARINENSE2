import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless';
import netlify from '@astrojs/netlify';

// Verifica se está rodando na Vercel
const isVercel = process.env.VERCEL === '1';

export default defineConfig({
    // Mantemos 'hybrid' para performance, funciona em ambos os ambientes
    output: 'hybrid',

    // Seleciona o adaptador automaticamente
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
            // Otimizações de minificação que você pediu
            cssMinify: 'lightningcss',
            chunkSizeWarningLimit: 500,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    }
                }
            }
        }
    }
});
