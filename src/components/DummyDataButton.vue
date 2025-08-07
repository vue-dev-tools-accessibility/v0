<template>
  <button @click="loadDummyData">
    <!-- Icon by Gregor Cresnar -->
    <svg
      viewBox="0 0 100 125"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M85 91.3 74.8 77.8c-2.3-3-3.6-6.8-3.6-10.6V50.1c4.9-5.6 7.6-13.1 7-21.3-1.1-14-12.5-25.3-26.5-26.4-16.4-1.3-30.1 11-31.2 26.9v.7c0 2.6-1 6.7-2.2 9-1.3 2.4-2.6 4.8-3.7 6.5-1.1 1.7.1 3.9 2.1 3.9h3.8v13.9c0 2.8 2.3 5.1 5.1 5.1h10.5v5.3c0 3.6-1.4 7.1-4 9.6l-8 8.1c-2.3 2.4-.7 6.4 2.6 6.4h55.1c3.3-.1 5.2-3.9 3.2-6.5zm-18.2-60H49.4v17.4c-9.6 0-17.4-7.8-17.4-17.4h17.4V13.9c9.6 0 17.4 7.8 17.4 17.4z"
      />
      <title>Load Dummy Data</title>
    </svg>
  </button>
</template>

<script>
import { violationsStore } from '@/stores/violations.js';

import { dummyData } from '@/helpers/dummyData.js';

export default {
  name: 'DummyDataButton',
  methods: {
    loadDummyData: function () {
      violationsStore().setViolations(dummyData);
    }
  }
};
</script>

<style scoped>
button {
  color: var(--icon-fill);
  opacity: 0.7;
}
button:hover {
  opacity: 1.0;
}
button:focus {
  outline: 1px solid currentColor;
}
svg {
  width: 19.2;
  height: 19.2;
  fill: var(--icon-fill);
}
</style>
