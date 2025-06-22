<template>
  <div>
    Element has insufficient color contrast of
    <strong>{{ data.contrastRatio }}:1</strong>
    (text color:
    <ColorBlock :color="data.fgColor" />,
    background color:
    <ColorBlock :color="data.bgColor" />,
    font size:
    <strong>{{ data.fontSize }}</strong>,
    font weight:
    <strong>{{ data.fontWeight }}</strong>).
    Expected contrast ratio of
    <strong>{{ data.expectedContrastRatio }}</strong>.
    <ul v-if="textSuggestion || backgroundSuggestion">
      <li v-if="textSuggestion">
        Suggested text color:
        <ColorBlock :color="textSuggestion" />
      </li>
      <li v-if="backgroundSuggestion">
        Suggested background color:
        <ColorBlock :color="backgroundSuggestion" />
      </li>
    </ul>
    <template v-if="textSuggestion && backgroundSuggestion">
      You should not need to change both text and background.
      Changing either to the suggested color should be enough.
    </template>
  </div>
</template>

<script>
import { makeHexesContrast } from 'color-contrast-picker';

import { asyncify } from '@/helpers/helpers.js';

export default {
  name: 'ColorContrastDetails',
  components: {
    ColorBlock: asyncify(() => import('@/components/ColorBlock.vue'))
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    makeSuggestion: function (color, fixedColor) {
      // '4.5:1' => '4.5' => 4.5
      const contrastRatio = Number(this.data.expectedContrastRatio.split(':')[0]);
      const suggestion = makeHexesContrast(color, fixedColor, contrastRatio);
      if (suggestion.toUpperCase() !== color.toUpperCase()) {
        return suggestion.toUpperCase();
      }
      return undefined;
    }
  },
  computed: {
    textSuggestion: function () {
      return this.makeSuggestion(this.data.fgColor, this.data.bgColor);
    },
    backgroundSuggestion: function () {
      return this.makeSuggestion(this.data.bgColor, this.data.fgColor);
    }
  }
};
</script>
