const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      baseUrl: 'localhost:3000'
    },
  }
});
