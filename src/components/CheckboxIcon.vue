<template>
  <svg
    class="checkbox-icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="pathData"
      fill="currentColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'CheckboxIcon',
  props: {
    enabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pathData: function () {
      const box = 'M3 21V3h18v18zm2-2h14V5H5z';
      const checkedBox = 'm10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM3 21V3h18v18z';
      if (this.enabled) {
        return checkedBox;
      }
      return box;
    }
  }
};
</script>

<style scoped>
.checkbox-icon {
  width: 13.5px;
  height: 13.5px;
}
</style>
