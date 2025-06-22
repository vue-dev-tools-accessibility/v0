import { themeStore } from '@/stores/theme.js';
import { versionsStore } from '@/stores/versions.js';
import { violationsStore } from '@/stores/violations.js';

const logError = (error) => {
  console.log('Axe had an error', error);
};

export const listenToParent = () => {
  const displayMessage = ($event) => {
    const data = $event.message || $event.data;
    if (data.theme) {
      themeStore().setTheme(data.theme);
    }
    if (data.error) {
      logError(data.error);
    }
    if (data.violations) {
      violationsStore().setViolations(data.violations);
    }
    if (data.axeLoading) {
      violationsStore().setAxeLoading(true);
    }
    if (data.axeVersion) {
      versionsStore().setAxeVersion(data.axeVersion);
    }
    if (data.vdtaVersion) {
      versionsStore().setVdtaVersion(data.vdtaVersion);
    }
  };
  if (window.addEventListener) {
    window.addEventListener('message', displayMessage, false);
  } else {
    window.attachEvent('onmessage', displayMessage);
  }
};
