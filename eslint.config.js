import path from 'node:path';

import pluginJs from '@eslint/js';
import tjwBase from 'eslint-config-tjw-base';
import tjwImport from 'eslint-config-tjw-import';
import tjwJest from 'eslint-config-tjw-jest';
import tjwVue from 'eslint-config-tjw-vue';
import pluginImport from 'eslint-plugin-import';
import pluginJest from 'eslint-plugin-jest';
import pluginVue from 'eslint-plugin-vue';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';
import globals from 'globals';

const __dirname = import.meta.dirname;
const vue3Recommended = pluginVue.configs['flat/recommended'];
const vueA11yRecommended = pluginVueA11y.configs['flat/recommended'];

export default [
  pluginJs.configs.recommended,
  tjwBase.configs.recommended,

  pluginImport.flatConfigs.recommended,
  tjwImport,

  pluginJest.configs['flat/recommended'],
  tjwJest.configs.recommended,

  ...vue3Recommended,
  ...vueA11yRecommended,
  tjwVue,

  {
    languageOptions: {
      ecmaVersion: 2025,
      globals: {
        ...globals.browser,
        vi: true
      }
    },
    rules: {
      'import/no-anonymous-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-namespace': 'off',
      'import/no-unresolved': 'off',
      'import/no-unused-modules': 'off',

      // If this is not turned off, linting throws because it can't find 'jest' install
      'jest/no-deprecated-functions': 'off',

      'vue/no-multiple-template-root': [
        'off'
      ],
      'vuejs-accessibility/label-has-for': [
        'error',
        {
          components: ['Label'],
          required: {
            some: ['nesting', 'id']
          },
          allowChildren: false
        }
      ]
    },
    settings: {
      'import/resolver': {
        vite: {
          viteConfig: {
            resolve: {
              alias: {
                '@': path.resolve(__dirname, 'src'),
                '@@': path.resolve(__dirname, 'tests')
              }
            }
          }
        }
      }
    }
  }
];
