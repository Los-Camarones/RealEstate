// File: cypress/e2e/PageNavigation.cy.ts
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test due to known exceptions related to React or other common issues
  if (err.message.includes('Script error') ||
      err.message.includes('Minified React error') ||
      err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    return false; // Ignore these known exceptions
  }
  return true;
});

describe('Page Navigation Tests', () => {
  beforeEach(() => {
    // Visit the main page before each test and ensure the page loads fully
    cy.visit('https://www.lourdesmendoza.com');
    cy.wait(2000);
  });

  it('should navigate to the Home page and verify 200 status', () => {
    cy.get('a[href="/"]').first().should('be.visible').click({ force: true });
    cy.url().should('include', '/');
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  

  it('should navigate to the About Me page and verify 200 status', () => {
    cy.get('a[href="/Aboutme"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/Aboutme');
    cy.request('/Aboutme').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Sellers page and verify 200 status', () => {
    cy.get('a[href="/Sellers"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/Sellers');
    cy.request('/Sellers').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Markets page and verify 200 status', () => {
    cy.get('a[href="/markets"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/markets');
    cy.request('/markets').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Listings page and verify 200 status', () => {
    cy.get('a[href="/property-search"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/property-search');
    cy.request('/property-search').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Buyers page and verify 200 status', () => {
    cy.get('a[href="/Buyers"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/Buyers');
    cy.request('/Buyers').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Contact page and verify 200 status', () => {
    cy.get('a[href="/contact"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/contact');
    cy.request('/contact').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the Get PreQualified page and verify 200 status', () => {
    cy.contains('a', 'Get PreQualified', { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.url().should('include', '/GetPreQualified');
    cy.request('/GetPreQualified').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should open the Sign In modal when clicking the Sign In button', () => {
    // Click on the "Sign In" button
    cy.get('button').contains('Sign In', { timeout: 10000 }).should('be.visible').click({ force: true });
  
    // Check that the Sign In modal is visible
    cy.get('.ihf-container').should('be.visible'); // Replace '.modal-selector' with the actual class or ID of the modal container
  });
  
  
});
