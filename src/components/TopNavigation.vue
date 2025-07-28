<template>
  <header>
    <div class="links">
      <NavigationLink route="violations">
        Violations
        <span
          v-if="totalViolations"
          v-html="totalViolations"
          class="pill"
          :class="{ 'pill-dim': axeLoading }"
        ></span>
      </NavigationLink>
      <NavigationLink route="settings">
        Settings
      </NavigationLink>
      <NavigationLink route="about">
        About
      </NavigationLink>
    </div>
    <div class="icons">
      <DummyDataButton v-if="isLocal" />
      <a
        v-if="!isInIframe"
        href="#"
        @click.prevent="toggleTheme"
      >
        <svg
          v-if="theme === 'light'"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.503 5.414a15.076 15.076 0 0 0 11.593 18.194a11.1 11.1 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1 1 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.07 13.07 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3"
            fill="currentColor"
          />
          <title>Toggle theme</title>
        </svg>
        <svg
          v-else
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6M5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
            fill="currentColor"
          />
          <title>Toggle theme</title>
        </svg>
      </a>
      <a
        href="https://vue-dev-tools-accessibility.github.io"
        target="_blank"
      >
        <svg
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.89 4H7.83A1.88 1.88 0 0 0 6 5.91v24.18A1.88 1.88 0 0 0 7.83 32h20.34A1.88 1.88 0 0 0 30 30.09V11.92Zm-.3 2.49l6 5.9h-6ZM8 30V6h12v8h8v16Z"
            fill="currentColor"
          />
          <path
            d="M0 0h36v36H0z"
            fill="none"
          />
          <title>View Documentation</title>
        </svg>
      </a>
      <a
        href="https://github.com/vue-dev-tools-accessibility/vue-dev-tools-accessibility"
        target="_blank"
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
            fill="currentColor"
          />
          <title>Star on GitHub</title>
        </svg>
      </a>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { themeStore } from '@/stores/theme.js';
import { violationsStore } from '@/stores/violations.js';

import { asyncify } from '@/helpers/helpers.js';

export default {
  name: 'TopNavigation',
  components: {
    DummyDataButton: asyncify(() => import('@/components/DummyDataButton.vue')),
    NavigationLink: asyncify(() => import('@/components/NavigationLink.vue'))
  },
  methods: {
    ...mapActions(themeStore, [
      'toggleTheme'
    ])
  },
  computed: {
    isInIframe: function () {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    },
    isLocal: function () {
      return window.location.href.includes('localhost');
    },
    ...mapState(themeStore, [
      'theme'
    ]),
    ...mapState(violationsStore, [
      'axeLoading',
      'totalViolations'
    ])
  }
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 38.5px;
  border-bottom: 1px solid var(--border-color);
  padding: 0rem 0.75rem;
  font-feature-settings: normal;
  font-size: 0.875rem;
  font-variant-settings: normal;
  font-weight: 500;
  line-height: 1;
}
.links {
  display: flex;
  gap: 0.75rem;
}
.link {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38.5px;
  border-bottom: 2px solid transparent;
  text-rendering: geometricPrecision;
}
.router-link-active {
  border-bottom-color: var(--active-ink);
  color: var(--active-ink);
  opacity: 1.0;
}

.pill {
  display: inline-block;
  background: var(--base-ink);
  border-radius: 50px;
  margin: 0px 0px 0px 5px;
  padding: 4px 8px;
  color: var(--base-bg);
  font-weight: 300;
  opacity: 0.9;
}
.router-link-active .pill {
  background: var(--active-ink);
}
.link:hover .pill {
  opacity: 1.0;
}
.pill-dim,
.link:hover .pill-dim {
  opacity: 0.4;
}

.icons {
  display: flex;
}
.icons a,
.icons button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  background: transparent;
  border: 0px;
  margin-right: 7.5px;
  color: var(--icon-fill);
  cursor: pointer;
}
.icons a:focus {
  outline: 1px solid currentColor;
}
.icons a:last-of-type {
  margin-right: 0px;
}
.icons svg {
  width: 19.2px;
  height: 19.2px;
}
</style>
