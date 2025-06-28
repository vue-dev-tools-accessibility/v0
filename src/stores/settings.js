import { defineStore } from 'pinia';

import { sendToParent } from '@/helpers/communication/send.js';
import { REQUESTS } from '@/helpers/constants.js';

const STORAGE_KEY = 'VDTA_SETTINGS';

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
    load: function () {
      let data = undefined;
      try {
        data = localStorage.getItem(STORAGE_KEY);
        data = JSON.parse(data);
      } catch (error) {
        console.log({ error });
      }

      if (data?.colorStandard) {
        this.setColorStandard(data.colorStandard);
      }
    },
    save: function () {
      try {
        const data = JSON.stringify({
          colorStandard: this.colorStandard
        });
        window.localStorage.setItem(STORAGE_KEY, data);
      } catch (error) {
        console.log({ error });
      }
    }
  }
});
