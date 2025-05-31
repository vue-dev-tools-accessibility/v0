import { themeStore } from '@/stores/theme.js';
import { violationsStore } from '@/stores/violations.js';

import { REQUESTS } from '@/helpers/constants.js';

const handleError = (error) => {
  console.log('Axe had an error', error);
};

export const listenToParent = () => {
  const displayMessage = ($event) => {
    const data = $event.message || $event.data;
    if (data.theme) {
      themeStore().setTheme(data.theme);
    }
    if (data.error) {
      handleError(data.error);
    }
    if (data.violations) {
      violationsStore().setViolations(data.violations);
    }
  };
  if (window.addEventListener) {
    window.addEventListener('message', displayMessage, false);
  } else {
    window.attachEvent('onmessage', displayMessage);
  }
};
export const sendToParent = (action, data) => {
  // Limit requests to parent to only those permitted
  if (Object.values(REQUESTS).includes(action)) {
    parent.postMessage({ action, data }, '*');
  }
};
