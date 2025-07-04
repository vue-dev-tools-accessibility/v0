<template>
  <TopNavigation />
  <main>
    <RouterView />
  </main>
</template>

<script>
import { autoRunStore } from '@/stores/autoRun.js';
import { themeStore } from '@/stores/theme.js';

import { listenToParent } from '@/helpers/communication/listen.js';
import { REQUESTS, sendToParent } from '@/helpers/communication/send.js';

import TopNavigation from '@/components/TopNavigation.vue';

export default {
  name: 'App',
  components: {
    TopNavigation
  },
  methods: {
    initialize: function () {
      listenToParent();
      sendToParent(REQUESTS.LOAD_SETTINGS);
      sendToParent(REQUESTS.SEND_THEME, themeStore().theme);
      document.addEventListener('focus', () => {
        sendToParent(REQUESTS.SEND_THEME, themeStore().theme);
      });
      autoRunStore().toggleAutoRun();
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
