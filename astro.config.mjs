import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel'; // Trocamos netlify por vercel
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    output: 'server', // Adicionado para suportar funções serverless na Vercel
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [react()],
    adapter: vercel() // Configurado para a Vercel
});
