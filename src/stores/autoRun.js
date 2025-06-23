import { defineStore } from 'pinia';

import { sendToParent } from '@/helpers/communication/send.js';
import { REQUESTS } from '@/helpers/constants.js';

export const autoRunStore = defineStore('autoRun', {
  state: function () {
    return {
      autoRun: false
    };
  },
  actions: {
    toggleAutoRun: function () {
      this.autoRun = !this.autoRun;
      sendToParent(REQUESTS.WATCH_DOM, this.autoRun);
    }
  }
});
