<template>
  <div>
    <strong>{{ label }}</strong>
    <ul>
      <li
        v-for="(violation, violationIndex) in violations"
        :key="'violation-' + violationIndex"
      >
        <template v-if="violation.includes('Element has insufficient APCA')">
          Element has insufficient APCA {{ standard }} level contrast of
          <strong>{{ data.apcaContrast }}<abbr title="Lightness contrast">Lc</abbr></strong>
          (foreground color:
          <ColorBlock :color="data.fgColor" />,
          background color:
          <ColorBlock :color="data.bgColor" />,
          font size: <strong>{{ data.fontSize }}</strong>,
          font weight: <strong>{{ data.fontWeight }}</strong>).<br />
          <template v-if="data.apcaThreshold">
            Expected minimum APCA lightness contrast of
            <strong>{{ data.apcaThreshold }}<abbr title="Lightness contrast">Lc</abbr></strong>.
          </template>
          <template v-if="data.messageKey === 'increaseFont'">
            <ul>
              <li>
                <strong>Suggestion:</strong>
                Increase font size and/or font weight to meet APCA conformance minimums.
              </li>
            </ul>
          </template>
        </template>
        <template v-else>
          {{ violation }}
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { asyncify } from '@/helpers/helpers.js';

export default {
  name: 'ApcaColorContrast',
  components: {
    ColorBlock: asyncify(() => import('@/components/ColorBlock.vue'))
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    standard: {
      type: String,
      required: true
    }
  },
  computed: {
    label: function () {
      return this.message.split('\n')[0];
    },
    violations: function () {
      return this.message.split('\n').slice(1);
    }
  }
};
</script>
