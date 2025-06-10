# UI for v0.x.x of Vue-Dev-Tools-Accessibility


## Running Locally

1. Install [Volta](https://volta.sh)
1. Clone the repo
1. `npm i && npm start`
1. From here you can do basic UI development in the browser.

If you want to test with it embedded in the Vite-Vue-DevTools:

1. In another repo that is a Vue 3 app using Vite and Vite-Vue-DevTools, install the plugin:
  * `npm install --save-dev vue-dev-tools-accessibility`
1. Add the plugin to the Vite config
    ```js
    // vite.config.js
    import vue from '@vitejs/plugin-vue';
    import { defineConfig } from 'vite';
    import vueDevTools from 'vite-plugin-vue-devtools';
    import vueDevToolsAccessibility from '../vue-dev-tools-accessibility/index.js';

    export default defineConfig({
      plugins: [
        vue(),
        vueDevTools(),
        vueDevToolsAccessibility()
      ]
    });
    ```
1. Start the other repo's server with an environment variable to load `v0` locally instead of from the internet.
  * `"start": "cross-env VITE_A11Y=local",`
