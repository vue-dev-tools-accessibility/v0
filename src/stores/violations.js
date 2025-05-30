import { defineStore } from 'pinia';

export const violationsStore = defineStore('violations', {
  state: function () {
    return {
      violations: []
    };
  },
  actions: {
    setViolations: function (violations) {
      this.violations = violations;
    }
  }
});
