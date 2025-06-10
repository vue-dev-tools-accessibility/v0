<template>
  <div class="wrapper">
    <button
      class="run-axe"
      :disabled="axeLoading"
      @click="runAxe"
    >
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
      <DoxenAccordion
        :show="!!violationGroup.show"
        :key="'accordion-' + violationGroup.id"
      >
        <div>
          <div class="rule-details">
            <span
              class="pill"
              :class="violationGroup.impact"
              :title="_startCase(violationGroup.impact)"
            >
              {{ _startCase(violationGroup.impact) }}
            </span>
            <span
              v-for="tag in violationGroup.tags"
              class="pill gray"
              :title="tag"
              :key="tag"
            >
              {{ tag }}
            </span>
            <div>
              <span class="rule-id">
                <strong>ID:</strong>
                {{ violationGroup.id }}
              </span>
            </div>
            <div class="rule-help">
              {{ addPeriod(violationGroup.help) }}
              <a
                class="rule-learn-more"
                :href="violationGroup.helpUrl"
                target="_blank"
                :title="urlAsTitle(violationGroup.helpUrl)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>Learn more</title>
                  <path
                    d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="cards">
            <div
              v-for="(node, nodeIndex) in violationGroup.nodes"
              class="card"
              :key="'nodes-' + nodeIndex"
            >
              <ColorContrastDetails
                v-if="violationGroup.id === 'color-contrast'"
                :data="node.any[0].data"
              />
              <pre
                v-else
                v-text="fixMessage(node.failureSummary)"
                class="rule-message"
              ></pre>

              <button
                class="rule-highlight"
                @click="highlightTarget(node.target)"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>target icon</title>
                  <path
                    d="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z"
                    fill="currentColor"
                  />
                </svg>
                Highlight element on page
              </button>
              <CodeBlock :code="node.html" />
            </div>
          </div>
        </div>
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

import CodeBlock from '@/components/CodeBlock.vue';
import ColorContrastDetails from '@/components/ColorContrastDetails.vue';

export default {
  name: 'AccessibilityViolations',
  components: {
    CodeBlock,
    ColorContrastDetails,
    DoxenAccordion
  },
  methods: {
    _startCase,
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
    urlAsTitle: function (url) {
      return url.split('://')[1].split('?')[0];
    },
    upperFirst: function (value) {
      return value[0].toUpperCase() + value.slice(1);
    },
    fixMessage: function (message) {
      message = message.trim();
      message = message.replace('Fix all of the following:', '');
      message = message.replace('Fix any of the following:', '');
      message = this.addPeriod(message);
      message = this.upperFirst(message);
      message = message
        .split('\n  ')
        .map((line, lineIndex) => {
          if (lineIndex === 0) {
            return line;
          }
          return '    • ' + this.upperFirst(line.trim());
        })
        .join('\n');
      return message.trim();
    },
    highlightTarget: function (target) {
      sendToParent(REQUESTS.HIGHLIGHT_TARGET, target[0]);
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
      'axeLoading',
      'violations'
    ])
  },
  created: function () {
    this.runAxe();
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
.run-axe[disabled],
.run-axe[disabled]:hover {
  opacity: 0.4;
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

.rule-details {
  margin-top: 0.5rem;
}
.rule-id {
  display: block;
  margin: 1rem 0.5rem 0.5rem;
  font-size: 0.7rem;
}
.rule-help {
  margin-left: 0.5rem;
  margin-bottom: 1.5rem;
}
.rule-learn-more svg {
  height: 20px;
  vertical-align: bottom;
}
.rule-message {
  margin: 0px;
  font-family: inherit;
  text-wrap: wrap;
}
.rule-highlight {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: 0px;
  border-radius: 20px;
  background: var(--button-bg);
  margin-top: 1rem;
  padding: 0.25rem 0.5rem;
  color: var(--button-text);
}
.rule-highlight:focus {
  outline: 1px solid var(--base-ink);
}
.rule-highlight svg {
  width: 17px;
}

.cards {
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 1rem;
  flex-wrap: wrap;
}
.card {
  display: inline-flex;
  flex-direction: column;
  width: clamp(350px, 30%, 500px);
  border: 1px solid var(--border-color);
  padding: 1rem;
}
.rule-details .pill {
  font-size: 0.57rem;
  font-weight: 650;
}
.pill {
  display: inline-block;
  background: var(--pill-green);
  border-radius: 50px;
  margin: 0px 0px 0.25rem 5px;
  padding: 7px 8px 4px 8px;
  color: var(--base-bg);
  font-size: 0.875rem;
  font-weight: 300;
  opacity: 0.9;
}
.pill:hover {
  opacity: 1.0;
}
.pill.serious {
  background: var(--pill-red);
}
.pill.moderate {
  background: var(--pill-yellow);
}
.pill.gray {
  background: var(--pill-gray);
}
</style>
