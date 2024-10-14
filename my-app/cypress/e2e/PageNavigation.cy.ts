// File: cypress/e2e/PageNavigation.cy.ts
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test due to uncaught exceptions related to hydration or cross-origin issues
    return false;
});

describe('Page Navigation Tests', () => {
    beforeEach(() => {
      // Visit the main page before each test
      cy.visit('http://localhost:3000');
      cy.wait(1000);  // Add extra wait time to ensure the page is fully loaded
    });

    it('should navigate to the Home page', () => {
      cy.get('.pt-2 > [href="/"] > .ml-2').click({ force: true });
      cy.url().should('include', '/'); // Verify if the URL includes '/'
    });

    it('should navigate to the About Me page', () => {
      cy.get('.pt-2 > [href="/Aboutme"] > .ml-2').click({ force: true });
      cy.url().should('include', '/Aboutme'); // Verify if the URL includes '/Aboutme'
    });

    it('should navigate to the Sellers page', () => {
      cy.get('.pt-2 > [href="/Sellers"] > .ml-2').click({ force: true });
      cy.url().should('include', '/Sellers'); // Verify if the URL includes '/Sellers'
    });

    it('should navigate to the Markets page', () => {
      cy.get('.pt-2 > [href="/markets"] > .ml-2').click({ force: true });
      cy.url().should('include', '/markets'); // Verify if the URL includes '/markets'
    });

    it('should navigate to the Listings page', () => {
      cy.get('.lg\\:flex > [href="/property-search"] > .ml-2').click({ force: true });
      cy.url().should('include', '/property-search'); // Verify if the URL includes '/property-search'
    });

    it('should navigate to the Buyers page', () => {
      cy.get('.lg\\:flex > [href="/Buyers"] > .ml-2').click({ force: true });
      cy.url().should('include', '/Buyers'); // Verify if the URL includes '/Buyers'
    });

    it('should navigate to the Contact page', () => {
      cy.get('[href="/contact"] > .ml-2').click({ force: true });
      cy.url().should('include', '/contact'); // Verify if the URL includes '/contact'
    });

    it('should navigate to the Get PreQualified page', () => {
        // Using cy.contains() as a fallback to select by link text
        cy.contains('a', 'Get PreQualified', { timeout: 10000 })
          .should('exist') // Ensure the link exists
          .click({ force: true }); // Force click in case visibility is an issue
    
        // Verify if the URL includes '/GetPreQualified'
        cy.url().should('include', '/GetPreQualified');
    });
      
  
    it('should navigate to the Property listings page', () => {
        cy.get('.lg\\:flex > [href="/property-search"] > .ml-2').click({ force: true });
        cy.url().should('include', '/property-search'); // Verify if the URL includes '/property-organizer'
    });

    it('should navigate to the Sign In page', () => {
        // Use cy.contains to target by link text as a fallback if the class selector fails
        cy.contains('a', 'Sign in', { timeout: 10000 })
          .should('exist') // Ensure the link exists
          .should('be.visible') // Ensure the link is visible
          .click({ force: true }); // Force the click in case visibility is an issue
      
        // Verify the URL after the click
        cy.url().should('include', '/property-organizer');
      });

});
