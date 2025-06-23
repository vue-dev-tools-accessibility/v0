<template>
  <div class="empty-state">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="143.5"
      height="179.7"
      style="fill: var(--icon-fill)"
    >
      <circle
        cx="15.3"
        cy="15.3"
        r="15.3"
        transform="translate(53.7 3)"
      />
      <path
        d="M69 141.1a35.3 35.3 0 01-18.4-65.4v-7a41.4 41.4 0 1057.8 50.2l-5-5a35.4 35.4 0 01-34.3 27.2z"
      />
      <path
        d="M53.7 90.5a15.3 15.3 0 0015.4 15.3h30.7l30.7 30.7a7.7 7.7 0 0010.8-10.8L110.6 95a15.3 15.3 0 00-10.8-4.5H84.4v-42a33.7 33.7 0 008.6-6.3l26-26a7.7 7.7 0 00-10.8-10.9l-26 26a18.4 18.4 0 01-26.1 0l-26-26a7.7 7.7 0 00-11 10.9l26.1 26a33.7 33.7 0 008.5 6.2z"
      />
      <title>
        "Happy Wheelchair User" icon by Egon Låstad
      </title>
    </svg>
    No accessibility violations found.
  </div>
</template>

<script>
export default {
  name: 'EmptyState'
};
</script>

<style scoped>
.empty-state {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
}
</style>
