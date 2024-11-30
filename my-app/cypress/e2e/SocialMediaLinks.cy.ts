// File: cypress/e2e/SocialMediaLinks.cy.ts
/// <reference types="cypress" />

/*
 * Handle uncaught exceptions during test execution.
 * Ignore known issues like React errors, ResizeObserver warnings, and postMessage errors
 * to prevent Cypress from failing the tests due to external script issues.
 */
Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes('Minified React error') ||
    err.message.includes('ResizeObserver loop completed with undelivered notifications') ||
    err.message.includes('postMessage') ||
    err.message.includes('Script error') ||
    err.message.includes('Cannot read properties of null')
  ) {
    return false;
  }
  return true;
});

/*
 * Describe block for Social Media Links Tests
 * Scope: Verify the functionality of social media links on the website.
 * - Ensure that links open in a new tab
 * - Verify the presence of required security attributes
 */
describe('Social Media Links Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.lourdesmendoza.com', { failOnStatusCode: false }); // Visit the main page
    cy.get('body', { timeout: 10000 }).should('be.visible'); // Ensure the page has fully loaded
    cy.wait(5000); // Add a static wait for stability
  });

  /*
   * Test: Verify navigation to Instagram.
   * - Check that the Instagram link is visible
   * - Validate that the link opens in a new tab with proper security attributes
   */
  it('should navigate to Instagram when the Instagram icon is clicked', () => {
    cy.get('a[href*="instagram.com"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.attr', 'target', '_blank') // Ensure it opens in a new tab
      .should('have.attr', 'rel', 'noopener noreferrer') // Check for security attributes
      .click({ force: true });
  });

  /*
   * Test: Verify navigation to Facebook.
   * - Check that the Facebook link is visible
   * - Validate that the link opens in a new tab with proper security attributes
   */
  it('should navigate to Facebook when the Facebook icon is clicked', () => {
    cy.get('a[href*="facebook.com"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.attr', 'target', '_blank') // Ensure it opens in a new tab
      .should('have.attr', 'rel', 'noopener noreferrer') // Check for security attributes
      .click({ force: true });
  });

  /*
   * Test: Verify navigation to LinkedIn.
   * - Check that the LinkedIn link is visible
   * - Validate that the link opens in a new tab with proper security attributes
   */
  it('should navigate to LinkedIn when the LinkedIn icon is clicked', () => {
    cy.get('a[href*="linkedin.com"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.attr', 'target', '_blank') // Ensure it opens in a new tab
      .should('have.attr', 'rel', 'noopener noreferrer') // Check for security attributes
      .click({ force: true });
  });

  /*
   * Test: Verify navigation to YouTube.
   * - Check that the YouTube link is visible
   * - Validate that the link opens in a new tab with proper security attributes
   */
  it('should navigate to YouTube when the YouTube icon is clicked', () => {
    cy.get('a[href*="youtube.com"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.attr', 'target', '_blank') // Ensure it opens in a new tab
      .should('have.attr', 'rel', 'noopener noreferrer') // Check for security attributes
      .click({ force: true });
  });

  /*
   * Test: Verify navigation to X (formerly Twitter).
   * - Check that the X link is visible
   * - Validate that the link opens in a new tab with proper security attributes
   */
  it('should navigate to X (formerly Twitter) when the X icon is clicked', () => {
    cy.get('a[href*="x.com"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.attr', 'target', '_blank') // Ensure it opens in a new tab
      .should('have.attr', 'rel', 'noopener noreferrer') // Check for security attributes
      .click({ force: true });
  });
});
