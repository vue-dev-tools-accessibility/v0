<template>
  <RouterLink
    :custom="true"
    :to="{ name: route }"
    v-slot="{ navigate }"
  >
    <button
      v-if="$route.name !== route"
      class="link"
      @click="navigate"
    >
      <slot></slot>
    </button>
    <span
      v-else
      aria-level="1"
      class="link router-link-active"
      role="heading"
    >
      <slot></slot>
    </span>
  </RouterLink>
</template>

<script>
export default {
  name: 'NavigationLink',
  props: {
    route: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.link {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38.5px;
  background: transparent;
  border: 0px;
  border-bottom: 2px solid transparent;
  padding: 0px;
  color: currentColor;
  font-weight: 500;
  text-rendering: geometricPrecision;
  cursor: pointer;
}
.link:focus-visible {
  outline: 1px solid currentColor;
}
.router-link-active {
  border-bottom-color: var(--active-ink);
  color: var(--active-ink);
  opacity: 1.0;
}
</style>
