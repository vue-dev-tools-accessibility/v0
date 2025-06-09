<template>
  <div>
    Element has insufficient color contrast of
    <strong>{{ data.contrastRatio }}</strong>
    (text color:
    <ColorBlock :color="data.fgColor" />,
    background color:
    <span
      class="color-block"
      :style="'background:' + data.bgColor"
    ></span>
    <ColorBlock :color="data.fgColor" />,
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
  </div>
</template>

<script>
import { makeHexesContrast } from 'color-contrast-picker';

import ColorBlock from '@/components/ColorBlock.vue';

export default {
  name: 'ColorContrastDetails',
  components: {
    ColorBlock
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    makeSuggestion: function (color, fixedColor) {
      const contrastRatio = this.data.expectedContrastRatio;
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
