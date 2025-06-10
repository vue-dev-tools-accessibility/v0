import { fileURLToPath, URL } from 'node:url';

/* eslint-disable-next-line import/default */
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import { configDefaults } from 'vitest/dist/config.js';

export default defineConfig({
  base: '/v0',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'color-contrast-picker': ['color-contrast-picker'],
          lodash: [
            'lodash.clonedeep',
            'lodash.startcase'
          ],
          'normalize.css': ['normalize.css'],
          pinia: ['pinia'],
          'vue3-snapshot-serializer': ['vue3-snapshot-serializer'],
          vue: ['vue'],
          'vue-doxen': ['vue-doxen'],
          'vue-options-api-constants-plugin': ['vue-options-api-constants-plugin'],
          'vue-router': ['vue-router']
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
