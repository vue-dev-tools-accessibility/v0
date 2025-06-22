import { violationsStore } from '@/stores/violations.js';

import { REQUESTS } from '@/helpers/constants.js';

export const sendToParent = (action, data) => {
  if (action === REQUESTS.RUN_AXE) {
    violationsStore().setAxeLoading(true);
  }
  // Limit requests to parent to only those permitted
  if (Object.values(REQUESTS).includes(action)) {
    parent.postMessage({ action, data }, '*');
  }
};
