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
      v-for="(violationGroup, violationGroupIndex) in violations"
      class="group"
      :key="violationGroup.id"
    >
      <div
        class="rule-heading"
        role="button"
        tabindex="0"
        @click="toggleGroup(violationGroupIndex)"
        @keyup.enter="toggleGroup(violationGroupIndex)"
        @keydown.space.prevent="toggleGroup(violationGroupIndex)"
      >
        <span>
          <span class="pill">{{ violationGroup.nodes.length }}</span>
          <span class="rule-name">{{ violationNamer(violationGroup.id) }}</span>
        </span>
        <span class="rule-description">{{ addPeriod(violationGroup.description) }}</span>
      </div>
      <DoxenAccordion :show="!!violationGroup.show">
        <ul>
          <li
            v-for="(value, key) in violationGroup"
            :key="[violationGroup.id, key].join('_')"
          >
            <strong>{{ key }}:</strong>
            <template v-if="key === 'nodes'">
              <div
                v-for="(node, nodeIndex) in violationGroup.nodes"
                class="card"
                :key="[key, nodeIndex].join('_')"
              >
                <ul
                  v-for="(subValue, subKey) in node"
                  :key="[key, nodeIndex, subKey].join('_')"
                >
                  <li>
                    <strong>{{ subKey }}:</strong>
                    {{ subValue }}
                  </li>
                </ul>
              </div>
            </template>
            <span v-else>
              &nbsp;{{ value }}
            </span>
          </li>
        </ul>
      </DoxenAccordion>
    </div>
  </div>
</template>

<script>
import _startCase from 'lodash.startcase';
import { mapState } from 'pinia';
import { DoxenAccordion } from 'vue-doxen';

import { violationsStore } from '@/stores/violations.js';

import { sendToParent } from '@/helpers/communication.js';
import { REQUESTS } from '@/helpers/constants.js';

export default {
  name: 'AccessibilityViolations',
  components: {
    DoxenAccordion
  },
  methods: {
    violationNamer: function (id) {
      const violationIdNameMap = {
        'aria-prohibited-attr': 'ARIA Prohibited Attribute'
      };
      const fallback = _startCase(id)
        .replace('Aria', 'ARIA')
        .replace('Attr', 'Attribute')
        .replace('Attributeibute', 'Attribute');
      return (violationIdNameMap[id] || fallback);
    },
    addPeriod: function (value) {
      if (value.trim().endsWith('.')) {
        return value.trim();
      }
      return value.trim() + '.';
    },
    runAxe: function () {
      sendToParent(REQUESTS.RUN_AXE);
    },
    toggleGroup: function (index) {
      if (this.violations[index].show) {
        this.violations[index].show = false;
        return;
      }
      this.violations.forEach((group) => {
        group.show = false;
      });
      this.violations[index].show = true;
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
.group {
  border: 1px solid var(--border-color);
  padding: 1rem;
}
.rule-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  cursor: pointer;
}
.rule-name {
  margin: 0rem 0.75rem 0.25rem 1rem;
  opacity: 0.9;
}
.rule-description {
  background: var(--border-color);
  border-radius: 0.25rem;
  margin: 0px 0px 0.25rem auto;
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  text-align: center;
  opacity: 0.9;
}
.rule-heading:hover .pill,
.rule-heading:hover .rule-name,
.rule-heading:hover .rule-description {
  opacity: 1.0;
}

.card {
  border: 1px solid var(--border-color);
}
.pill {
  display: inline-block;
  background: var(--base-ink);
  background: var(--active-ink);
  border-radius: 50px;
  margin: 0px 0px 0.25rem 5px;
  padding: 4px 8px;
  color: var(--base-bg);
  font-size: 0.875rem;
  font-weight: 300;
  opacity: 0.9;
}
.pill:hover {
  opacity: 1.0;
}

</style>
