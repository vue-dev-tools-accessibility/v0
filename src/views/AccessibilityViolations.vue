<template>
  <div class="wrapper">
    <div class="buttons">
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
          <title>Scan for accessibility issues</title>
        </svg>
      </button>
      <label
        class="run-automatically"
        role="button"
        tabindex="0"
        title="Runs Axe every time the DOM updates"
        @keyup.enter="toggleAutoRun"
        @keydown.space.prevent="toggleAutoRun"
      >
        <input
          type="checkbox"
          hidden
          :value="autoRun"
          @input="toggleAutoRun"
        />
        <CheckboxIcon :enabled="autoRun" />
        Run Automatically
      </label>
    </div>

    <EmptyState
      v-if="!violations.length"
      :style="'opacity:' + (axeLoading ? '0.4' : '1.0')"
    />

    <div
      v-for="violationGroup in violations"
      class="group"
      :key="violationGroup.id"
    >
      <div
        class="rule-heading"
        role="button"
        tabindex="0"
        @click="toggleGroup(violationGroup.id)"
        @keyup.enter="toggleGroup(violationGroup.id)"
        @keydown.space.prevent="toggleGroup(violationGroup.id)"
      >
        <span>
          <PillText type="positive">
            {{ violationGroup.nodes.length }}
          </PillText>
          <span class="rule-name">{{ violationNamer(violationGroup.id) }}</span>
        </span>
        <span class="rule-description">{{ addPeriod(violationGroup.description) }}</span>
      </div>
      <DoxenAccordion
        :show="selectedAccordion === violationGroup.id"
        :key="'accordion-' + violationGroup.id"
      >
        <div>
          <div class="rule-details">
            <PillText
              :type="violationGroup.impact"
              title="Impact level"
            >
              {{ _startCase(violationGroup.impact) }}
            </PillText>
            <PillText
              v-for="tag in violationGroup.tags"
              type="common"
              :title="getTagHoverText(tag)"
              :key="tag"
            >
              {{ tag }}
            </PillText>
            <div>
              <span class="rule-id">
                <strong>ID:</strong>
                {{ violationGroup.id }}
              </span>
            </div>
            <div class="rule-help">
              {{ addPeriod(violationGroup.help) }}
              <a
                :href="violationGroup.helpUrl"
                target="_blank"
                :title="urlAsTitle(violationGroup.helpUrl)"
              >
                <IconQuestion>
                  Learn More
                </IconQuestion>
              </a>
            </div>
          </div>
          <div class="cards">
            <div
              v-for="(node, nodeIndex) in violationGroup.nodes"
              class="card"
              :key="'nodes-' + nodeIndex"
            >
              <RuleColorContrast
                v-if="['color-contrast', 'color-contrast-enhanced'].includes(violationGroup.id)"
                :data="node.any[0].data"
              />
              <RuleApcaColorContrast
                v-else-if="['color-contrast-apca-bronze', 'color-contrast-apca-silver'].includes(violationGroup.id)"
                :data="node.all[0].data"
                :message="node.failureSummary"
                :standard="violationGroup.id.split('-')[3]"
              />
              <RuleLinkInTextBlock
                v-else-if="violationGroup.id === 'link-in-text-block'"
                class="rule-message"
                :data="node.any[0].data"
                :message="node.failureSummary"
              />
              <div
                v-else
                v-html="fixMessage(node.failureSummary)"
                class="rule-message"
              ></div>

              <template
                v-if="![
                  'page-has-heading-one'
                ].includes(violationGroup.id)"
              >
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
              </template>
            </div>
          </div>
        </div>
      </DoxenAccordion>
    </div>
  </div>
</template>

<script>
import _startCase from 'lodash.startcase';
import {
  mapActions,
  mapState
} from 'pinia';
import { DoxenAccordion } from 'vue-doxen';

import { autoRunStore } from '@/stores/autoRun.js';
import { violationsStore } from '@/stores/violations.js';

import { REQUESTS, sendToParent } from '@/helpers/communication/send.js';
import {
  asyncify,
  escapeHtml,
  upperFirst
} from '@/helpers/helpers.js';
import { getTagHoverText } from '@/helpers/tags.js';

export default {
  name: 'AccessibilityViolations',
  components: {
    CheckboxIcon: asyncify(() => import('@/components/CheckboxIcon.vue')),
    CodeBlock: asyncify(() => import('@/components/CodeBlock.vue')),
    DoxenAccordion,
    EmptyState: asyncify(() => import('@/components/EmptyState.vue')),
    IconQuestion: asyncify(() => import('@/components/IconQuestion.vue')),
    PillText: asyncify(() => import('@/components/PillText.vue')),
    RuleApcaColorContrast: asyncify(() => import('@/components/rules/ApcaColorContrast.vue')),
    RuleColorContrast: asyncify(() => import('@/components/rules/ColorContrast.vue')),
    RuleLinkInTextBlock: asyncify(() => import('@/components/rules/LinkInTextBlock.vue'))
  },
  data: function () {
    return {
      selectedAccordion: ''
    };
  },
  methods: {
    _startCase,
    getTagHoverText,
    violationNamer: function (id) {
      const violationIdNameMap = {
        'aria-prohibited-attr': 'ARIA Prohibited Attribute',
        'color-contrast-apca-bronze': 'Color Contrast (APCA Bronze)',
        'color-contrast-apca-silver': 'Color Contrast (APCA Silver)'
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
    fixMessage: function (message) {
      message = message.trim();
      message = escapeHtml(message);
      message = message.replace('Fix all of the following:', '<strong>Fix all of the following:</strong>');
      message = message.replace('Fix any of the following:', '<strong>Fix any of the following:</strong>');
      message = message
        .split('\n  ')
        .map((line, lineIndex) => {
          if (lineIndex === 0) {
            return line + '<ul>';
          }
          let newLine = '<li>' + upperFirst(line.trim()) + '</li>';
          if (message.split('\n  ').length === lineIndex + 1) {
            return newLine + '</ul>';
          }
          return newLine;
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
    toggleGroup: function (id) {
      if (this.selectedAccordion === id) {
        this.selectedAccordion = '';
      } else {
        this.selectedAccordion = id;
      }
    },
    ...mapActions(autoRunStore, [
      'toggleAutoRun'
    ])
  },
  computed: {
    ...mapState(autoRunStore, [
      'autoRun'
    ]),
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
.buttons {
  display: flex;
  justify-content: end;
  margin-bottom: 1rem;
}
.run-axe,
.run-automatically {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37.6px;
  height: 37.6px;
  border: 1px solid var(--border-color);
  border-radius: 4px 0px 0px 4px;
  background: transparent;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
}
.run-axe:hover,
.run-axe:focus,
.run-automatically:hover,
.run-automatically:focus {
  outline: none;
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
.run-automatically {
  gap: 8px;
  width: auto;
  border-left: 0px;
  border-radius: 0px 4px 4px 0px;
  padding: 0px 8px;
}

.group {
  border: 1px solid var(--border-color);
  padding: 1rem;
}
.group + .group {
  border-top: 0px;
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
.rule-message {
  margin: 0px;
  font-family: inherit;
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
</style>
