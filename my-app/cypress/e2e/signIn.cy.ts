// File: cypress/e2e/SignInPage.cy.ts
/// <reference types="cypress" />

describe('Sign In Pages', () => {
  // Prevent Cypress from failing the test due to uncaught exceptions related to cross-origin scripts
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test due to hydration or cross-origin issues
    return false;
  });

  it('should load the Sign In page (property-organizer) and display the IHF container', () => {
    // Visit the Sign In page at /property-organizer
    cy.visit('https://www.lourdesmendoza.com/property-organizer?section=signin');

    // Verify the URL is correct
    cy.url().should('include', '/property-organizer?section=signin');

    // Verify the IHF container is visible
    cy.get('.ihf-container').should('be.visible');
  });

  it('should load the Admin Sign In page (Sign-in) and display the custom Sign In form', () => {
    // Visit the Sign In page at /Sign-in
    cy.visit('https://www.lourdesmendoza.com/Sign-in?section=signin');

    // Verify the URL is correct
    cy.url().should('include', '/Sign-in?section=signin');

    // Verify the "Sign In" heading is visible
    cy.get('.text-2xl').should('be.visible').and('contain.text', 'Sign In');

    // Verify the username and password fields are visible
    cy.get(':nth-child(1) > .input-field').should('be.visible').and('have.attr', 'placeholder', 'Enter your username');
    cy.get(':nth-child(2) > .input-field').should('be.visible').and('have.attr', 'placeholder', 'Enter your password');

    // Verify the Login button is visible
    cy.get('.login-button').should('be.visible').and('contain.text', 'Login');
  });
});
