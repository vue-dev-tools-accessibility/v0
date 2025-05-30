import { fileURLToPath, URL } from 'node:url';

/* eslint-disable-next-line */
import vue from '@vitejs/plugin-vue';
/* eslint-disable-next-line */
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
/* eslint-disable-next-line import/named */
import { configDefaults } from 'vitest/dist/config.js';

export default defineConfig({
  base: '/v0',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'normalize.css': ['normalize.css'],
          vue: ['vue'],
          'vue-options-api-constants-plugin': ['vue-options-api-constants-plugin']
        }
      }
    },
    sourcemap: true
  },
  plugins: [
    vue(),
    vueDevTools({
      launchEditor: 'subl'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@@': fileURLToPath(new URL('./tests', import.meta.url))
    }
  },
  test: {
    coverage: {
      exclude: [
        ...(configDefaults?.coverage?.exclude || []),
        '.eslintrc.cjs',
        './src/main.js',
        '**/scripts/'
      ],
      reportsDirectory: './tests/unit/coverage'
    },
    environment: 'happy-dom',
    globals: true,
    root: '.',
    setupFiles: [
      './tests/unit/setup.js'
    ],
    snapshotSerializers: [
      './node_modules/vue3-snapshot-serializer/index.js'
    ]
  }
});
