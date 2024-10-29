// File: cypress/e2e/PageNavigation.cy.ts
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test due to uncaught exceptions related to hydration or cross-origin issues
  return false;
});

describe('Page Navigation Tests', () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit('https://www.lourdesmendoza.com');
    // Add extra wait time to ensure the page is fully loaded
    cy.wait(1000);
  });

  it('should navigate to the Home page and verify 200 status', () => {
    // Click on the Home link
    cy.get('.pt-2 > [href="/"] > .ml-2').click({ force: true });
    // Verify if the URL includes '/'
    cy.url().should('include', '/');
    // Check for a 200 status response from the Home page
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the About Me page and verify 200 status', () => {
    // Click on the About Me link
    cy.get('.pt-2 > [href="/Aboutme"] > .ml-2').click({ force: true });
    // Verify if the URL includes '/Aboutme'
    cy.url().should('include', '/Aboutme');
    // Check for a 200 status response from the About Me page
    cy.request('/Aboutme').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Sellers page and verify 200 status', () => {
    // Click on the Sellers link
    cy.get('.pt-2 > [href="/Sellers"] > .ml-2').click({ force: true });
    // Verify if the URL includes '/Sellers'
    cy.url().should('include', '/Sellers');
    // Check for a 200 status response from the Sellers page
    cy.request('/Sellers').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Markets page and verify 200 status', () => {
    // Click on the Markets link
    cy.get('.pt-2 > [href="/markets"] > .ml-2').click({ force: true });
    // Verify if the URL includes '/markets'
    cy.url().should('include', '/markets');
    // Check for a 200 status response from the Markets page
    cy.request('/markets').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Listings page and verify 200 status', () => {
    // Click on the Listings link
    cy.get('.lg\\:flex > [href="/property-search"] > .ml-2').click({ force: true });
    // Verify if the URL includes '/property-search'
    cy.url().should('include', '/property-search');
    // Check for a 200 status response from the Listings page
    cy.request('/property-search').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Buyers page and verify 200 status', () => {
    // Click on the Buyers button
    cy.get('.relative > a > .buyers-button')
      .should('be.visible')
      .click({ force: true });
    // Verify if the URL includes '/Buyers'
    cy.url().should('include', '/Buyers');
    // Check for a 200 status response from the Buyers page
    cy.request('/Buyers').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Contact page and verify 200 status', () => {
    // Click on the Contact link
    cy.get('[href="/contact"] > .ml-2').click({ force: true });
    // Verify if the URL includes '/contact'
    cy.url().should('include', '/contact');
    // Check for a 200 status response from the Contact page
    cy.request('/contact').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Get PreQualified page and verify 200 status', () => {
    // Use cy.contains() to select the Get PreQualified link
    cy.contains('a', 'Get PreQualified', { timeout: 10000 })
      .should('exist')
      .click({ force: true });
    // Verify if the URL includes '/GetPreQualified'
    cy.url().should('include', '/GetPreQualified');
    // Check for a 200 status response from the Get PreQualified page
    cy.request('/GetPreQualified').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Property listings page and verify 200 status', () => {
    // Click on the Property Listings link
    cy.get('.lg\\:flex > [href="/property-search"] > .ml-2').click({ force: true });
    // Verify if the URL includes '/property-search'
    cy.url().should('include', '/property-search');
    // Check for a 200 status response from the Property Listings page
    cy.request('/property-search').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Sign In page and verify 200 status', () => {
    // Use cy.contains() to select the Sign In link
    cy.contains('a', 'Sign in', { timeout: 10000 })
      .should('exist')
      .click({ force: true });
    // Verify if the URL includes '/property-organizer'
    cy.url().should('include', '/property-organizer');
    // Check for a 200 status response from the Sign In page
    cy.request('/property-organizer').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

});
