<template>
  <button
    v-if="isLocal"
    class="dummy-button"
    @click="loadDummyData"
  >
    Load Dummy Data
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
  },
  computed: {
    isLocal: function () {
      return window.location.href.includes('localhost');
    }
  }
};
</script>

<style scoped>
.dummy-button {
  border: 0px;
  background: var(--button-bg);
  color: var(--button-text);
  opacity: 0.8;
}
.dummy-button:focus {
  outline: 1px solid var(--base-ink);
}
.dummy-button:hover {
  opacity: 1.0;
}
</style>
