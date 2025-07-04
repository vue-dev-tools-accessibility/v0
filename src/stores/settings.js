import { defineStore } from 'pinia';

import { REQUESTS, sendToParent } from '@/helpers/communication/send.js';

export const settingsStore = defineStore('settings', {
  state: function () {
    return {
      colorStandard: 'aa'
    };
  },
  actions: {
    setColorStandard: function (value) {
      if (this.colorStandard === value) {
        return;
      }
      this.colorStandard = value;
      sendToParent(REQUESTS.SET_COLOR_STANDARD, value);
      this.save();
    },
    load: function (data) {
      if (data?.colorStandard) {
        this.setColorStandard(data.colorStandard);
      }
    },
    save: function () {
      const data = {
        colorStandard: this.colorStandard
      };
      sendToParent(REQUESTS.SAVE_SETTINGS, data);
    }
  }
});
