import _cloneDeep from 'lodash.clonedeep';
import { defineStore } from 'pinia';

export const violationsStore = defineStore('violations', {
  state: function () {
    return {
      axeLoading: false,
      violations: []
    };
  },
  actions: {
    setAxeLoading: function (bool) {
      this.axeLoading = !!bool;
    },
    setViolations: function (violations) {
      let violationGroups = _cloneDeep(violations);
      violationGroups
        .forEach((violationGroup) => {
          violationGroup.nodes = violationGroup.nodes
            .filter((node) => {
              const devToolsIframeError = (
                violationGroup.id === 'frame-title' &&
                node.html.startsWith('<iframe') &&
                node.html.includes('id="vue-devtools-iframe"')
              );
              const devToolsAnchorError = (
                ['aria-prohibited-attr', 'region'].includes(violationGroup.id) &&
                node.html.startsWith('<div') &&
                node.html.includes('class="vue-devtools__anchor-btn')
              );
              return (
                !devToolsIframeError &&
                !devToolsAnchorError
              );
            });
        });
      violationGroups = violationGroups
        .filter((violationGroup) => {
          return violationGroup.nodes.length;
        });
      this.violations = violationGroups;
      this.setAxeLoading(false);
    }
  },
  getters: {
    totalViolations: function (state) {
      let total = 0;
      state.violations.forEach((violationCategory) => {
        total = total + violationCategory.nodes.length;
      });
      return total;
    }
  }
});
