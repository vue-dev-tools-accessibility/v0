<template>
  <RouterLink
    :custom="true"
    :to="{ name: route }"
    v-slot="{ navigate }"
  >
    <span
      v-bind="routerSpanAttributes"
      @click="navigate"
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
  },
  computed: {
    routerSpanAttributes: function () {
      if (this.$route.name === this.route) {
        return {
          'aria-level': '1',
          class: 'link router-link-active',
          role: 'heading'
        };
      }
      return {
        class: 'link'
      };
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
  border-bottom: 2px solid transparent;
  text-rendering: geometricPrecision;
  cursor: pointer;
}
.router-link-active {
  border-bottom-color: var(--active-ink);
  color: var(--active-ink);
  opacity: 1.0;
}
</style>
