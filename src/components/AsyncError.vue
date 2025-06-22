<template>
  <span
    v-text="'[ ASYNC COMPONENT ERROR ]'.replaceAll(' ', '&nbsp;')"
    class="error"
  ></span>
</template>

<script>
export default {
  name: 'AsyncError'
};
</script>

<style scoped>
.error {
  display: inline-block;
  background: var(--pill-red);
  border-radius: 4px;
  padding: 0px 5px;
  color: var(--base-bg);
  font-weight: 900;
  letter-spacing: 1px;
  word-break: break-all;
}
</style>
