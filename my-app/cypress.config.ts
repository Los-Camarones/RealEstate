// cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Set the default viewport width and height for all E2E tests
    viewportWidth: 1924,
    viewportHeight: 1080,
    baseUrl: "http://localhost:3000", // Optional, set your base URL if needed
    // You can add other settings like timeouts, retries, etc.
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    // Set the default viewport width and height for all component tests
    viewportWidth: 1924,
    viewportHeight: 1080,
  },
});
