import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // Importação mais específica
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    output: 'server', 
    adapter: vercel({
        webAnalytics: { enabled: true }, // Opcional, mas útil na Vercel
    }),
    integrations: [react()],
    vite: {
        plugins: [tailwindcss()]
    }
});
