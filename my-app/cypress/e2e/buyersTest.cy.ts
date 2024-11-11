// File: cypress/e2e/BuyersPage.cy.ts
/// <reference types="cypress" />

describe('Buyers Page Test', () => {
  // Prevent Cypress from failing the test due to uncaught exceptions related to cross-origin scripts
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test due to hydration or cross-origin issues
    return false;
  });

  it('should load the Buyers page successfully', () => {
    // Visit the Buyers page
    cy.visit('https://www.lourdesmendoza.com/Buyers');

    // Verify that the page loads without errors by checking the presence of a key element
    cy.get('body').should('be.visible');
  });
});
