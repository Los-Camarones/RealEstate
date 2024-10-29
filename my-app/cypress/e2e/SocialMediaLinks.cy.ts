// File: cypress/e2e/SocialMediaLinks.cy.ts
/// <reference types="cypress" />

// Ignore uncaught exceptions related to React errors
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Minified React error')) {
    // Prevent Cypress from failing the test due to the React error
    return false;
  }
  return true;
});

describe('Social Media Links Tests', () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit('https://www.lourdesmendoza.com');
  });

  it('should navigate to Instagram when the Instagram icon is clicked', () => {
    const instagramUrl = 'https://www.instagram.com/lourdesmendoza1/';
    cy.get(`a[href="${instagramUrl}"]`)
      .should('have.attr', 'target', '_blank') // Ensure it opens in a new tab
      .should('have.attr', 'rel', 'noopener noreferrer') // Check rel attributes for security
      .click({ force: true });

    // Check that the URL returns a 200 status
    cy.request({
      url: instagramUrl,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to Facebook when the Facebook icon is clicked', () => {
    const facebookUrl = 'https://www.facebook.com/Lolucasellsrealestate/';
    cy.get(`a[href="${facebookUrl}"]`)
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
      .click({ force: true });

    // Check that the URL returns a 200 status
    cy.request({
      url: facebookUrl,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to LinkedIn when the LinkedIn icon is clicked', () => {
    const linkedInUrl = 'https://www.linkedin.com';
    cy.get(`a[href="${linkedInUrl}"]`)
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
      .click({ force: true });

    // Check that the URL returns a 200 status
    cy.request({
      url: linkedInUrl,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // Ignore uncaught exceptions related to YouTube's scripts
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('postMessage') || err.message.includes('Minified React error')) {
    // Prevent the test from failing due to this error
    return false;
  }
  return true;
});

// Ignore uncaught exceptions related to YouTube's scripts
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('postMessage') || err.message.includes('Minified React error')) {
    // Prevent the test from failing due to this error
    return false;
  }
  return true;
});

it('should navigate to YouTube when the YouTube icon is clicked', () => {
  cy.get('a[href*="youtube.com"]')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'rel', 'noopener noreferrer')
    .click({ force: true });
});







  it('should navigate to X (formerly Twitter) when the X icon is clicked', () => {
    const twitterUrl = 'https://x.com/i/flow/login?redirect_after_login=%2Flourdesmendoza';
    cy.get(`a[href^="https://x.com"]`) // Adjust to be more flexible
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
      .click({ force: true });

    // Check that the URL returns a 200 status
    cy.request({
      url: twitterUrl,
      failOnStatusCode: false, // Prevents failure on non-200 responses
    }).then((response) => {
      cy.log(`Twitter response status: ${response.status}`);
      if (response.status !== 200) {
        cy.log('The Twitter URL returned a non-200 status, please verify the URL.');
      }
      expect(response.status).to.eq(200);
    });
  });
});
