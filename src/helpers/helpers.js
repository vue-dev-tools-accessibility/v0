import { defineAsyncComponent } from 'vue';

import AsyncError from '@/components/AsyncError.vue';
import AsyncLoading from '@/components/AsyncLoading.vue';

export const escapeHtml = function (value) {
  return value
    .replaceAll('\xa0', '&nbsp;')
    .replaceAll('"', '&quot;')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
};

export const upperFirst = function (value) {
  return value[0].toUpperCase() + value.slice(1);
};

export const asyncify = function (loader) {
  return defineAsyncComponent({
    loader,
    loadingComponent: AsyncLoading,
    delay: 0,
    errorComponent: AsyncError,
    timeout: 8000
  });
};
