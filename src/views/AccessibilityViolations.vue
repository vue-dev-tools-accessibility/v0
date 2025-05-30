<template>
  <div>
    <h1>Accessibility Violations</h1>
    <button @click="runAxe">
      Run Axe
    </button>
    <div
      v-for="violation in violations"
      :key="violation.id"
      class="card"
    >
      <ul>
        <li
          v-for="(value, key) in violation"
        >
          <strong>{{ key }}:</strong>
          {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { violationsStore } from '@/stores/violations.js';

import { sendToParent } from '@/helpers/communication.js';
import { REQUESTS } from '@/helpers/constants.js';

export default {
  name: 'AccessibilityViolations',
  methods: {
    runAxe: function () {
      sendToParent(REQUESTS.RUN_AXE);
    }
  },
  computed: {
    ...mapState(violationsStore, [
      'violations'
    ])
  }
};
</script>

<style scoped>
.card {
  border: 1px solid var(--border-color);
}
</style>
