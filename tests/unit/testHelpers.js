import { createTestingPinia } from '@pinia/testing';
import {
  flushPromises,
  mount,
  shallowMount
} from '@vue/test-utils';

import { router } from '@/router/index.js';

export default {
  flushPromises,
  setupOptions: function (options) {
    options = options || {};
    options.global = options.global || {};

    options.global.plugins = [
      router,
      createTestingPinia({
        stubActions: false
      })
    ];

    return options;
  },
  shallowMount: function (component, options) {
    options = this.setupOptions(options);
    const wrapper = shallowMount(component, options);
    return wrapper;
  },
  mount: async function (component, options) {
    options = this.setupOptions(options);
    const wrapper = await mount(component, options);
    await flushPromises();
    await vi.dynamicImportSettled();
    return wrapper;
  }
};
