import { defineStore } from 'pinia';

import { sendToParent } from '@/helpers/communication/send.js';
import { REQUESTS } from '@/helpers/constants.js';

export const versionsStore = defineStore('verions', {
  state: function () {
    return {
      axeVersion: '',
      vdtaVersion: ''
    };
  },
  actions: {
    setAxeVersion: function (version) {
      this.axeVersion = version;
    },
    /**
     * Set the Vue-Dev-Tools-Accessibility version number.
     *
     * @param {string} version  The library version.
     */
    setVdtaVersion: function (version) {
      this.vdtaVersion = version;
    },
    getVersions: function () {
      sendToParent(REQUESTS.SEND_VERSIONS);
    }
  }
});
