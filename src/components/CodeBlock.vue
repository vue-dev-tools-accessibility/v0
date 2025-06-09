<template>
  <DoxenCodeBox
    :copy="false"
    :code="formattedCode"
  />
</template>

<script>
import { DoxenCodeBox } from 'vue-doxen';
import { vueMarkupFormatter } from 'vue3-snapshot-serializer';

/** @typedef {import('vue3-snapshot-serializer/types').SETTINGS} SETTINGS */

export default {
  name: 'CodeBlock',
  components: {
    DoxenCodeBox
  },
  props: {
    code: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedCode: function () {
      /** @type {SETTINGS} */
      const settings = {
        formatting: {
          tagsWithWhitespacePreserved: []
        }
      };
      window.vueSnapshots = settings;
      return vueMarkupFormatter(this.code);
    }
  }
};
</script>
