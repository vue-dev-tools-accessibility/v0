<template>
  <button
    :id="forIdButton"
    :aria-checked="selected"
    :aria-labelledby="forIdLabel"
    class="chip"
    :class="{ selected }"
    role="radio"
    tabindex="0"
  >
    <CheckboxIcon :enabled="selected" />
    <label
      :id="forIdLabel"
      :for="forIdButton"
    >
      {{ label }}
    </label>
  </button>
</template>

<script>
import { useId } from 'vue';

import { asyncify } from '@/helpers/helpers.js';

export default {
  name: 'ChipButton',
  components: {
    CheckboxIcon: asyncify(() => import('@/components/CheckboxIcon.vue'))
  },
  props: {
    label: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    forIdLabel: function () {
      return 'chip-label-' + useId();
    },
    forIdButton: function () {
      return 'chip-button-' + useId();
    }
  }
};
</script>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background: var(--pill-gray);
  border: 0px;
  border-radius: 50px;
  padding: 7px 12px;
  color: var(--base-bg);
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1;
  opacity: 0.9;
}
.chip:last-of-type {
  margin-right: 0rem;
}
.chip:hover,
.chip:focus {
  opacity: 1.0;
}
.selected {
  background: var(--button-green);
}
</style>
