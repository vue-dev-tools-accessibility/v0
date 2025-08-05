import { violationsStore } from '@/stores/violations.js';

export const REQUESTS = Object.freeze({
  HIGHLIGHT_TARGET: 'highlightTarget',
  LOAD_SETTINGS: 'loadSettings',
  RUN_AXE: 'runAxe',
  SAVE_SETTINGS: 'saveSettings',
  SEND_THEME: 'sendTheme',
  SEND_VERSIONS: 'sendVersions',
  SET_COLOR_STANDARD: 'setColorStandard',
  WATCH_DOM: 'watchDom'
});

// Move this to helper function, reuse in TopNavigation.vue
function isInIframe () {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export const sendToParent = (action, data) => {
  if (
    action === REQUESTS.RUN_AXE &&
    isInIframe()
  ) {
    violationsStore().setAxeLoading(true);
  }
  // Limit requests to parent to only those permitted
  if (Object.values(REQUESTS).includes(action)) {
    parent.postMessage({ action, data }, '*');
  }
};
