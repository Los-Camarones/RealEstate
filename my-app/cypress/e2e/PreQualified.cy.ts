// File: cypress/e2e/PreQualified.cy.ts
/// <reference types="cypress" />

describe('Get PreQualified Page', () => {
  // Prevent Cypress from failing the test due to uncaught exceptions related to cross-origin scripts
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test due to hydration or cross-origin issues
    return false;
  });

  it('should load the Get PreQualified page and verify button redirect', () => {
    // Visit the Get PreQualified page
    cy.visit('https://www.lourdesmendoza.com/GetPreQualified');

    // Verify the button is visible
    cy.get('.bg-yellow-500').should('be.visible');

    // Click on the button
    cy.get('.bg-yellow-500').click();

    // Verify the redirection to the homeloaner page
    cy.url().should('include', '/homeloaner');
  });
});
