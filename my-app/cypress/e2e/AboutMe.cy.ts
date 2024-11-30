// File: cypress/e2e/AboutMe.cy.ts
/// <reference types="cypress" />

/**
 * Test Suite: Render About Me Page
 */
describe('Render About Me Page', () => {
  // Prevent Cypress from failing the test due to uncaught exceptions
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore known hydration or cross-origin issues
    return false;
  });

  /**
   * Test Case: Verify visibility of the "ihf-container"
   * This ensures the main content container on the About Me page is rendered correctly.
   */
  it('should verify that the ihf-container is visible', () => {
    // Visit the About Me page
    cy.visit('https://www.lourdesmendoza.com/Aboutme');

    // Check that the "ihf-container" is both visible and exists in the DOM
    cy.get('.ihf-container', { timeout: 10000 })
      .should('be.visible')
      .should('exist');
  });

  /**
   * Test Case: Verify the main heading text
   * Ensure the main heading on the About Me page is rendered with the correct content.
   */
  it('should display the main heading', () => {
    cy.visit('https://www.lourdesmendoza.com/Aboutme');

    cy.get('.about_hero-title__FbQ5D', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Welcome to Lourdes Mendoza Real Estate');
  });


  
/**
 * Test Case: Verify key sections
 * Ensure that headings in the About Me page are present and visible.
 */
it('should display key sections with correct headings', () => {
  // Visit the About Me page
  cy.visit('https://www.lourdesmendoza.com/Aboutme');

  // Ensure the API responsible for content loading succeeds before proceeding
  cy.intercept('GET', '**/text_content*').as('textContent');
  cy.wait('@textContent').its('response.statusCode').should('eq', 200);

  // Verify "Serving The City of Trees" section
  cy.get('.about_section-heading__9fXpq', { timeout: 15000 })
    .should('be.visible')
    .and('contain.text', 'Serving The City of Trees');
});


  /**
   * Test Case: Verify the footer section
   * Ensure the footer section and contact information are visible.
   */
  it('should display the footer section with contact details', () => {
    cy.visit('https://www.lourdesmendoza.com/Aboutme');

    // Verify contact phone number
    cy.get('footer')
      .should('be.visible')
      .and('contain.text', '+1 (916) 516-0007');

    // Verify the email address
    cy.get('footer').should('contain.text', 'lourdesmendoza1@yahoo.com');
  });
});
