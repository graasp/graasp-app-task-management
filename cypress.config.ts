import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require('./cypress/plugins/index')(on, config);
    },
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
  },
});
