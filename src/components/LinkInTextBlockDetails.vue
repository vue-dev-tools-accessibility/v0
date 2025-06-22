<template>
  <div>
    <strong>{{ label }}</strong>
    <ul>
      <li
        v-for="(violation, violationIndex) in violations"
        :key="'violation-' + violationIndex"
      >
        <template v-if="violation.includes('insufficient color contrast')">
          The link has insufficient color contrast of
          <strong>{{ data.contrastRatio }}:1</strong>
          with the surrounding text.
          (Minimum contrast is
          <strong>{{ data.requiredContrastRatio }}:1</strong>,
          link text:
          <ColorBlock :color="data.nodeColor" />,
          surrounding text:
          <ColorBlock :color="data.parentColor" />)
          <ul>
            <li>Suggested Link color: <ColorBlock :color="linkSuggestion" /></li>
            <li>Suggested Text color: <ColorBlock :color="textSuggestion" /></li>
          </ul>
          You should not need to change both text and link.
          Changing either to the suggested color should be enough to satisify this rule.
          Keep in mind the contrast between the text/link and background as well.
        </template>
        <template v-else>
          {{ violation }}
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { makeHexesContrast } from 'color-contrast-picker';
import { defineAsyncComponent } from 'vue';

export default {
  name: 'LinkInTextBlockDetails',
  components: {
    ColorBlock: defineAsyncComponent(() => import('@/components/ColorBlock.vue'))
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    makeSuggestion: function (color, fixedColor) {
      // '4.5:1' => '4.5' => 4.5
      const contrastRatio = Number(this.data.requiredContrastRatio);
      const suggestion = makeHexesContrast(color, fixedColor, contrastRatio);
      if (suggestion.toUpperCase() !== color.toUpperCase()) {
        return suggestion.toUpperCase();
      }
      return undefined;
    }
  },
  computed: {
    linkSuggestion: function () {
      return this.makeSuggestion(this.data.nodeColor, this.data.parentColor);
    },
    textSuggestion: function () {
      return this.makeSuggestion(this.data.parentColor, this.data.nodeColor);
    },
    label: function () {
      return this.message.split('\n')[0];
    },
    violations: function () {
      return this.message.split('\n').slice(1);
    }
  }
};
</script>
