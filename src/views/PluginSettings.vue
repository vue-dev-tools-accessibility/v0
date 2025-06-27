<template>
  <div class="wrapper">
    <fieldset>
      <div>
        <legend id="color-contrast-ruleset-label">
          Color Contrast Ruleset:
        </legend>
        <button
          class="learn-more-button"
          @click="showContrastDetails = !showContrastDetails"
        >
          <IconQuestion>
            Learn more
          </IconQuestion>
        </button>
      </div>
      <div
        aria-labelledby="color-contrast-ruleset-label"
        role="radiogroup"
      >
        <ChipButton
          label="WCAG 2 AA"
          :selected="colorStandard === 'wcag'"
          @click="setColorStandard('wcag')"
        />
        <ChipButton
          label="APCA Bronze"
          :selected="colorStandard === 'bronze'"
          @click="setColorStandard('bronze')"
        />
        <ChipButton
          label="APCA Silver"
          :selected="colorStandard === 'silver'"
          @click="setColorStandard('silver')"
        />
      </div>
      <DoxenAccordion :show="showContrastDetails">
        <p>
          WCAG 2 AA uses the 4.5:1 mathematical contrast ratio for colors to ensure
          there is enough contrast between elements for those with visual impairments.
        </p>
        <p>
        </p>
        <p>
          APCA™ is a newer color contrast model based on human perception of colors.
          It is a candidate for WCAG 3, and is currently in public beta.
          WCAG 3 is still in development and subject to changes prior to adoption.
          The APCA algorithm has not been official standardized yet, and may change.
        </p>
        <p>
          Bronze and Silver are different levels of enforcement with Bronze being less strict.
        </p>
      </DoxenAccordion>
    </fieldset>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { DoxenAccordion } from 'vue-doxen';

import { settingsStore } from '@/stores/settings.js';

import { asyncify } from '@/helpers/helpers.js';

export default {
  name: 'PluginSettings',
  components: {
    ChipButton: asyncify(() => import('@/components/ChipButton.vue')),
    DoxenAccordion,
    IconQuestion: asyncify(() => import('@/components/IconQuestion.vue'))
  },
  data: function () {
    return {
      showContrastDetails: false
    };
  },
  methods: {
    ...mapActions(settingsStore, [
      'load',
      'setColorStandard'
    ])
  },
  computed: {
    ...mapState(settingsStore, [
      'colorStandard'
    ])
  },
  created: function () {
    this.load();
  }
};
</script>

<style scoped>
.wrapper {
  padding: 11.25px;
}
fieldset {
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--border-color);
}
legend {
  display: inline-block;
  margin: 0.5rem 0rem 1rem 0rem;
}
.learn-more-button {
  border: 0px;
  background: transparent;
  color: var(--icon-fill);
  opacity: 0.7;
  cursor: pointer;
}
.learn-more-button:focus,
.learn-more-button:hover {
  opacity: 1.0;
}
</style>
