<template>
  <div class="wrapper">
    <button class="run-axe" @click="runAxe">
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 10H6.78A11 11 0 0 1 27 16h2A13 13 0 0 0 6 7.68V4H4v8h8zm8 12h5.22A11 11 0 0 1 5 16H3a13 13 0 0 0 23 8.32V28h2v-8h-8z"
          fill="currentColor"
        />
      </svg>
    </button>
    <div
      v-for="violation in violations"
      class="card"
      :key="violation.id"
    >
      <ul>
        <li
          v-for="(value, key) in violation"
          :key="violation.id + '_' + key"
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
.wrapper {
  padding: 11.25px;
}
.run-axe {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37.6px;
  height: 37.6px;
  border: 0px;
  background: transparent;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
}
.run-axe:hover {
  opacity: 1.0;
}
.run-axe svg {
  width: 21.6px;
  height: 21.6px;
}
.card {
  border: 1px solid var(--border-color);
}
</style>
