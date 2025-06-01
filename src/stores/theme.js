import { defineStore } from 'pinia';

export const themeStore = defineStore('theme', {
  state: function () {
    return {
      theme: ''
    };
  },
  actions: {
    setTheme: function (theme) {
      this.theme = theme;
      window.document.body.classList.remove('light');
      window.document.body.classList.remove('dark');
      window.document.body.classList.add(theme);
    },
    toggleTheme: function () {
      let newTheme = 'light';
      if (this.theme === 'light') {
        newTheme = 'dark';
      }
      this.setTheme(newTheme);
    }
  }
});
