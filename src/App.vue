<template>
  <TopNavigation />
  <main>
    <RouterView />
  </main>
</template>

<script>
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
      sendToParent(REQUESTS.SEND_THEME);
    }
  },
  created: function () {
    this.initialize();
  }
};
</script>
