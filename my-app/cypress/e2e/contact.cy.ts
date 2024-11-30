// File: cypress/e2e/contact.cy.ts
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test due to hydration or cross-origin issues
  return false;
});

/*
 * Describe block for Contact page functionality
 */
describe('Contact Page Functionality', () => {
  beforeEach(() => {
    cy.visit('https://www.lourdesmendoza.com/contact');
    cy.wait(2000); // Allow time for the page to fully hydrate
  });

  /*
   * Test: Verify that the Contact page header is displayed correctly.
   * This includes checking that the header becomes visible once the opacity changes
   * and that it contains the expected text "Contact".
   */
  it('should load the Contact page and display the header', () => {
    cy.get('.text-5xl', { timeout: 10000 })
      .should('have.css', 'opacity', '1')
      .and('be.visible')
      .and('contain.text', 'Contact');
  });

  /*
   * Test: Verify that the primary description text on the Contact page
   * is visible and matches the expected content.
   */
  it('should display the Contact description', () => {
    cy.get('.text-lg', { timeout: 10000 })
      .should('be.visible')
      .and(
        'contain.text',
        'Fill out the form below, and we will be in touch with you shortly.'
      );
  });

  /*
   * Test: Verify that the secondary description text on the Contact page
   * is visible and matches the expected content, ensuring text normalization.
   */
  it('should display the additional Contact description', () => {
    cy.get('.text-md', { timeout: 10000 })
      .should('be.visible')
      .and(
        'contain.text',
        "We’re here to assist with any inquiries, feedback, or questions you may have."
      );
  });

  /*
   * Test: Verify that clicking the "Check Out Our List of Referrals" button
   * redirects the user to the Referrals page and ensures the correct URL and content.
   */
  it('should redirect to the Referrals page when the button is clicked', () => {
    cy.get('a > .px-4', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Check Out Our List of Referrals')
      .click();

    cy.url()
      .should('include', '/Referrals')
      .then((url) => {
        cy.log(`Redirected to: ${url}`);
      });

    cy.get('body', { timeout: 10000 })
      .should('contain.text', 'Ben Bhangu'); // Replace with an actual element unique to the Referrals page
  });
});
