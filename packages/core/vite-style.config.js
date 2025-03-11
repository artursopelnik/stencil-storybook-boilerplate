import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'src/themes/vite-generated',
    cssCodeSplit: true,
    target: 'es2017',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          return `${assetInfo.names.join(', ')}`
        },
      },
    },
    copyPublicDir: true,
    lib: {
      entry: [
        resolve(__dirname, './src/themes/dark.css'),
        resolve(__dirname, './src/themes/light.css'),
      ],
      formats: ['es'],
      name: 'DesignSystem'
    },
  },
})
