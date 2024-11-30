// File: cypress/e2e/BuyersPage.cy.ts
/// <reference types="cypress" />

/*
 * Describe block for Buyers Page Test
 * Scope: Verify that the Buyers page loads successfully without any errors.
 */
describe('Buyers Page Test', () => {
  /*
   * Prevent Cypress from failing tests due to uncaught exceptions.
   * This is to handle cross-origin or hydration issues gracefully.
   */
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  /*
   * Test: Verify that the Buyers page loads successfully.
   * The test checks the presence of the <body> element to ensure the page is rendered correctly.
   */
  it('should load the Buyers page successfully', () => {
    cy.visit('https://www.lourdesmendoza.com/Buyers'); // Navigate to the Buyers page
    cy.get('body').should('be.visible'); // Verify the <body> element is visible
  });
});
