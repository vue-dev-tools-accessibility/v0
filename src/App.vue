<template>
  <TopNavigation />
  <main>
    <RouterView />
  </main>
</template>

<script>
import { themeStore } from '@/stores/theme.js';

import {
  listenToParent,
  sendToParent
} from '@/helpers/communication.js';
import { REQUESTS } from '@/helpers/constants.js';

import TopNavigation from '@/components/TopNavigation.vue';

export default {
  name: 'App',
  components: {
    TopNavigation
  },
  methods: {
    initialize: function () {
      listenToParent();
      sendToParent(REQUESTS.SEND_THEME, themeStore().theme);
      document.addEventListener('focus', () => {
        sendToParent(REQUESTS.SEND_THEME, themeStore().theme);
      });
    }
  },
  created: function () {
    this.initialize();
  }
};
</script>

<style scoped>
main {
  height: calc(100vh - 39.5px);
  overflow: auto;
}
</style>
