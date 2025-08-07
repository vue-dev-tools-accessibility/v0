<template>
  <span
    class="pill"
    :class="type"
  ><slot></slot></span>
</template>

<script>
const ALLOWED_TYPES = [
  'positive',
  'serious',
  'moderate',
  'common'
];
export default {
  name: 'PillText',
  props: {
    type: {
      type: String,
      default: 'positive',
      validator: function (value) {
        return ALLOWED_TYPES.includes(value);
      }
    }
  }
};
</script>

<style scoped>
.pill {
  display: inline-block;
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
.pill.positive {
  background: var(--pill-green);
}
.pill.serious {
  background: var(--pill-red);
}
.pill.moderate {
  background: var(--pill-yellow);
  color: var(--pill-yellow-text);
}
.pill.common {
  background: var(--pill-gray);
}
</style>
