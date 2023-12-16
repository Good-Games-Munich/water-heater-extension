import { manifest } from './manifest.config';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react(), crx({ manifest, contentScripts: { injectCss: true } })],
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
                main: 'index.html',
                popup: 'popup.html',
            },
        },
    },
});
