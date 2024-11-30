// File: cypress/e2e/PageNavigation.cy.ts
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test due to known exceptions related to React or other common issues
  if (
    err.message.includes('Script error') ||
    err.message.includes('Minified React error') ||
    err.message.includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    return false; // Ignore these known exceptions
  }
  return true;
});

/*
 * Describe block for Page Navigation Tests
 * Verifies navigation between pages and validates their HTTP response statuses.
 */
describe('Page Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.lourdesmendoza.com'); // Visit the main page before each test
    cy.wait(2000); // Ensure the page loads fully
  });

  /*
   * Test: Verify navigation to the Home page.
   * Check that the page URL includes '/' and ensure a 200 status code is returned.
   */
  it('should navigate to the Home page and verify 200 status', () => {
    cy.get('a[href="/"]').first().should('be.visible').click({ force: true });
    cy.url().should('include', '/');
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  /*
   * Test: Verify navigation to the About Me page.
   * Check that the page URL includes '/Aboutme' and ensure a 200 status code is returned.
   */
  it('should navigate to the About Me page and verify 200 status', () => {
    cy.get('a[href="/Aboutme"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/Aboutme');
    cy.request('/Aboutme').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  /*
   * Test: Verify navigation to the Sellers page.
   * Check that the page URL includes '/Sellers' and ensure a 200 status code is returned.
   */
  it('should navigate to the Sellers page and verify 200 status', () => {
    cy.get('a[href="/Sellers"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/Sellers');
    cy.request('/Sellers').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  /*
   * Test: Verify navigation to the Markets page.
   * Check that the page URL includes '/markets' and ensure a 200 status code is returned.
   */
  it('should navigate to the Markets page and verify 200 status', () => {
    cy.get('a[href="/markets"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/markets');
    cy.request('/markets').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  /*
   * Test: Verify navigation to the Listings page.
   * Check that the page URL includes '/property-search' and ensure a 200 status code is returned.
   */
  it('should navigate to the Listings page and verify 200 status', () => {
    cy.get('a[href="/property-search"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/property-search');
    cy.request('/property-search').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  /*
   * Test: Verify navigation to the Buyers page.
   * Check that the page URL includes '/Buyers' and ensure a 200 status code is returned.
   */
  it('should navigate to the Buyers page and verify 200 status', () => {
    cy.get('a[href="/Buyers"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/Buyers');
    cy.request('/Buyers').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  /*
   * Test: Verify navigation to the Contact page.
   * Check that the page URL includes '/contact' and ensure a 200 status code is returned.
   */
  it('should navigate to the Contact page and verify 200 status', () => {
    cy.get('a[href="/contact"]').eq(0).should('be.visible').click({ force: true });
    cy.url().should('include', '/contact');
    cy.request('/contact').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  /*
   * Test: Verify the Valuation page loads correctly.
   * Directly navigate to the Valuation page, verify the URL, check for unique content, and ensure a 200 status code.
   */
  it('should load the Valuation page and verify 200 status and content', () => {
    cy.visit('/valuation'); // Directly visit the Valuation page
    cy.url().should('include', '/valuation');
    cy.get('.text-5xl', { timeout: 10000 }).should('contain.text', 'Valuation Request');
    cy.request('/valuation').then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
