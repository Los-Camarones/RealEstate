// cypress.config.ts
import { defineConfig } from "cypress";
import dotenv from "dotenv";

// Load environment variables from .env.local file
dotenv.config({path: '.env.local'});

export default defineConfig({
  e2e: {
    // Set the default viewport width and height for all E2E tests
    viewportWidth: 1924,
    viewportHeight: 1080,
    baseUrl: "https://www.lourdesmendoza.com/", // Optional, set your base URL if needed

    // Add environment variables
    env: {
      IHOMEFINDER_USERNAME: process.env.IHOMEFINDER_USERNAME,
      IHOMEFINDER_PASSWORD: process.env.IHOMEFINDER_PASSWORD,
    },
    // Other optional settings like timeouts, retries, etc.
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
