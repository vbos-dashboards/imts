import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/trade_dashboard/',
    build: {
        outDir: 'dist',
    },
    optimizeDeps: {
        exclude: ['sql.js']
    }
})
