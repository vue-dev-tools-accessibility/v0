import { defineStore } from 'pinia';

import { REQUESTS, sendToParent } from '@/helpers/communication/send.js';

/**
 * Normalizes version numbers to start with a lowercase 'v'.
 *
 * @param  {string} version  A version number from the parent iframe
 * @return {string}          Normalized version number
 */
function prefixWithV (version) {
  version = version.toLowerCase();
  if (version.startsWith('v')) {
    return version;
  }
  return 'v' + version;
}

export const versionsStore = defineStore('verions', {
  state: function () {
    return {
      apcaVersion: '',
      axeVersion: '',
      vdtaVersion: ''
    };
  },
  actions: {
    /**
     * Set the apca-w3 version number used by the plugin via apca-check.
     *
     * @param {string} version  APCA version number
     */
    setApcaVersion: function (version) {
      this.apcaVersion = prefixWithV(version);
    },
    /**
     * Set the Axe-core version number used by the plugin.
     *
     * @param {string} version  Axe-core library version
     */
    setAxeVersion: function (version) {
      this.axeVersion = prefixWithV(version);
    },
    /**
     * Set the Vue-Dev-Tools-Accessibility version number.
     *
     * @param {string} version  The library version.
     */
    setVdtaVersion: function (version) {
      this.vdtaVersion = prefixWithV(version);
    },
    /**
     * Ask the parent iframe (VDTA Plugin) to send us all
     * the version number data for the libraries it uses
     * and its own version.
     */
    getVersions: function () {
      sendToParent(REQUESTS.SEND_VERSIONS);
    }
  }
});
