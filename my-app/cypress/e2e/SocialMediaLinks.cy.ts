// File: cypress/e2e/SocialMediaLinks.cy.ts
/// <reference types="cypress" />

// Ignore uncaught exceptions related to specific errors
Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes('Minified React error') ||
    err.message.includes('ResizeObserver loop completed with undelivered notifications') ||
    err.message.includes('postMessage') ||
    err.message.includes('Script error') ||
    err.message.includes('Cannot read properties of null')
  ) {
    // Prevent Cypress from failing the test due to these errors
    return false;
  }
  return true;
});

describe('Social Media Links Tests', () => {
  beforeEach(() => {
    // Visit the main page before each test and ensure the page is fully loaded
    cy.visit('https://www.lourdesmendoza.com', { failOnStatusCode: false });
    cy.get('body', { timeout: 10000 }).should('be.visible'); // Ensure the body is visible
    cy.wait(5000); // Static wait to ensure stability
  });

  it('should navigate to Instagram when the Instagram icon is clicked', () => {
    cy.get('a[href*="instagram.com"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.attr', 'target', '_blank') // Ensure it opens in a new tab
      .should('have.attr', 'rel', 'noopener noreferrer') // Check rel attributes for security
      .click({ force: true });
  });

  it('should navigate to Facebook when the Facebook icon is clicked', () => {
    cy.get('a[href*="facebook.com"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
      .click({ force: true });
  });

  it('should navigate to LinkedIn when the LinkedIn icon is clicked', () => {
    cy.get('a[href*="linkedin.com"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.attr', 'target', '_blank') // Ensure it opens in a new tab
      .should('have.attr', 'rel', 'noopener noreferrer') // Check rel attributes for security
      .click({ force: true });
  });

  it('should navigate to YouTube when the YouTube icon is clicked', () => {
    cy.get('a[href*="youtube.com"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
      .click({ force: true });
  });

  it('should navigate to X (formerly Twitter) when the X icon is clicked', () => {
    cy.get('a[href*="x.com"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
      .click({ force: true });
  });
});
