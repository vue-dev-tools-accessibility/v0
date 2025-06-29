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
        class="color-standards-buttons"
        role="radiogroup"
      >
        <ChipButton
          label="WCAG 2 AA"
          :selected="colorStandard === 'aa'"
          @click="setColorStandard('aa')"
        />
        <ChipButton
          label="WCAG 2 AAA"
          :selected="colorStandard === 'aaa'"
          @click="setColorStandard('aaa')"
        />
        <ChipButton
          label="APCA Bronze"
          :selected="colorStandard === 'bronze'"
          @click="setColorStandard('bronze')"
        />
        <ChipButton
          label="APCA Silver+"
          :selected="colorStandard === 'silver'"
          @click="setColorStandard('silver')"
        />
      </div>
      <DoxenAccordion :show="showContrastDetails">
        <p v-if="colorStandard === 'aa'">
          <abbr title="Web Content Accessibility Guidelines, standards maintained by W3C">WCAG</abbr>
          2 AA uses the 4.5:1 mathematical contrast ratio for colors to ensure
          there is enough contrast between elements for those with visual impairments.
        </p>
        <p v-if="colorStandard === 'aaa'">
          <abbr title="Web Content Accessibility Guidelines, standards maintained by W3C">WCAG</abbr>
          2 AAA uses a contrast ration of 7:1. This is much more strict, and primarily used
          by sites/apps that are aimed at a visually impaired audience, or have very important
          information that demands the highest levels of accessibility.
        </p>
        <p v-if="colorStandard === 'bronze'">
          <abbr title="Accessible Perceptual Contrast Algorithm">APCA</abbr>™ is a
          newer color contrast model based on human perception of colors.
          It is a candidate for WCAG 3, and is currently in public beta.
          WCAG 3 is still in development and subject to changes prior to adoption.
          The APCA algorithm has not been officially standardized yet, and may change.
        </p>
        <p v-if="colorStandard === 'silver'">
          Bronze and Silver+ are different conformence levels for enforcement,
          with Bronze being less strict. Note that
          <abbr title="Accessible Perceptual Contrast Algorithm">APCA</abbr> takes
          font-size and font-weight into account. There is a sweet spot for font size
          and weight when it comes to readablity. Some font sizes or weights may be
          too small, too big, too thin, or too thick to be considered good for
          readability.
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
  max-width: 415px;
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
.color-standards-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.7rem;
}
</style>
