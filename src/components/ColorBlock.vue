<template>
  <span class="color-block-text">
    <span
      class="color-block"
      :style="'background: ' + color"
    ></span>
    <strong>{{ color.toUpperCase() }}</strong>
  </span>
</template>

<script>
export default {
  name: 'ColorBlock',
  props: {
    color: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.color-block-text {
  display: inline-flex;
}
.color-block {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid var(--base-ink);
  margin: 0px 3px 0px 0px;
  vertical-align: -1px;
}
</style>
