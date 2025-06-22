<template>
  <span
    class="loading"
    title="Async component loading"
  >
    <span class="dot dot-1">•</span>
    <span class="dot dot-2">•</span>
    <span class="dot dot-3">•</span>
  </span>
</template>

<script>
export default {
  name: 'AsyncLoading'
};
</script>

<style scoped>
.loading {
  display: inline-block;
  background: var(--border-color);
  border-radius: 4px;
  border: 1px solid var(--pill-gray);
  margin: -1px 0px;
  padding: 0px 6px;
  color: var(--pill-gray);
  font-size: 13px;
  vertical-align: middle;
}
.dot {
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.dot + .dot {
  margin-left: 0.15rem;
}
.dot-1 { animation-name: dot-1; }
.dot-2 { animation-name: dot-2; }
.dot-3 { animation-name: dot-3; }

@keyframes dot-1 {
  0%,
  19.9%,
  100% { opacity: 0; }
  20%,
  99% { opacity: 1; }
}
@keyframes dot-2 {
  0%,
  39.9%,
  100% { opacity: 0; }
  40%,
  99% { opacity: 1; }
}
@keyframes dot-3 {
  0%,
  59.9%,
  100% { opacity: 0; }
  60%,
  99.9% { opacity: 1; }
}

</style>
