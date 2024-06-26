import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        server: {
            port: 5173,
        },
        rollupOptions: {
            output: {
                entryFileNames: "[name].js",
                assetFileNames: "[name].[ext]",
            },
        }
    }
});