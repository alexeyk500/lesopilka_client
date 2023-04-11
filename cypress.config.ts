import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
