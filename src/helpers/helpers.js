import { defineAsyncComponent } from 'vue';

import AsyncError from '@/components/AsyncError.vue';
import AsyncLoading from '@/components/AsyncLoading.vue';

/**
 * Asynchronously loads components, for better code spliting.
 *
 * @param  {Promise} loader  () => import('@/path/file.vue')
 * @return {object}          A Vue component
 */
export const asyncify = function (loader) {
  return defineAsyncComponent({
    // Async component to load
    loader,
    // Component to show while loading async component
    loadingComponent: AsyncLoading,
    // Delay before showing loadingComponent
    delay: 200,
    // Component to show if async component times out
    errorComponent: AsyncError,
    // Time to wait before showing error component
    timeout: 8000
  });
};

/**
 * Replaces potentially dangerous characters with HTML entity encoding
 * versions to safely allow external text to be used with v-html.
 *
 * @param  {string} value  Potentially unsfae string
 * @return {string}        String with dangerous characters escaped
 */
export const escapeHtml = function (value) {
  return value
    .replaceAll('\xa0', '&nbsp;')
    .replaceAll('"', '&quot;')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
};

/**
 * Uppercases the first character in a string.
 *
 * @param  {string} value  phrase
 * @return {string}        Phrase
 */
export const upperFirst = function (value) {
  return value[0].toUpperCase() + value.slice(1);
};
