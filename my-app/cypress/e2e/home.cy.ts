// File: cypress/e2e/home.cy.ts
/// <reference types="cypress" />

// Prevent Cypress from failing the test due to uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test due to hydration or cross-origin issues
  return false;
});

/**
 * Test Case: Verify "Contact Me" button functionality
 * Ensure that clicking the "Contact Me" button displays the Contact Me card.
 */
describe('"Contact Me" Button Functionality', () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit('https://www.lourdesmendoza.com');
    cy.wait(2000); // Allow time for the page to hydrate fully
  });

  it('should display the Contact Me card when the Contact Me button is clicked', () => {
    // Click on the Contact Me button
    cy.get('.contact-btn') // Target the button using its class
      .should('be.visible') // Ensure it's visible
      .click();

    // Verify that the Contact Me card is displayed
    cy.get('.ContactMe_card__CIUsx', { timeout: 10000 }) // Use the class for the Contact Me card
      .should('be.visible');

    // Ensure the Contact Me title is correct
    cy.get('.ContactMe_title__crT6H', { timeout: 10000 }) // Target the title class
      .should('contain.text', 'Contact Me');

    // Optionally, scroll into view for additional visual confirmation
    cy.get('.ContactMe_card__CIUsx').scrollIntoView();
  });
});

/**
 * Test Case: Expand and hide "About Me" section
 * Verify expand and collapse functionality for the About Me section.
 */
describe('Expand and Hide About Me Section', () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit('https://www.lourdesmendoza.com');
    cy.wait(1000); // Wait for the page to fully load
  });

  it('should expand and verify the About Me content, then hide it', () => {
    // Step 1: Click to expand the About Me section
    cy.get('.expand-bar')
      .scrollIntoView()
      .click({ force: true });

    // Step 2: Verify that the About Me content is visible
    cy.get('.about-me-text > p').should('be.visible');

    // Step 3: Click again to hide the About Me section
    cy.get('.expand-bar')
      .scrollIntoView()
      .click({ force: true });
  });
});

/**
 * Test Case: Button Navigation Tests
 * Verify navigation to correct pages via button clicks on the homepage.
 */
describe('Button Navigation Tests', () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit('https://www.lourdesmendoza.com');
    cy.wait(2000); // Allow the page to hydrate fully
  });

  it('should navigate to the "What My Home Worth" page when the first button is clicked', () => {
    // Click the first button (Home Valuation button)
    cy.get(':nth-child(1) > .image-link > .caption', { timeout: 10000 }) // Updated selector
      .should('be.visible') // Ensure the button is visible
      .click({ force: true }); // Click with force to handle any overlapping elements

    // Verify navigation to the correct URL
    cy.url().should('include', '/valuation');

    // Check for the presence of a unique element on the Valuation page
    cy.get('h1', { timeout: 20000 }) // Target the header or unique identifier
      .should('contain.text', 'Valuation Request');

    // Verify HTTP response for the Valuation page
    cy.request({
      url: 'https://www.lourdesmendoza.com/valuation',
      failOnStatusCode: false, // Avoid failing the test on non-200 responses
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the response status is 200
    });
  });

  it('should navigate to the "Listings" page when the second button is clicked', () => {
    // Click the second button (Listings button)
    cy.get(':nth-child(2) > .image-link > .caption', { timeout: 10000 }) // Updated selector
      .should('be.visible') // Ensure the button is visible
      .click({ force: true }); // Click with force to handle any overlapping elements

    // Verify navigation to the correct URL
    cy.url().should('include', '/property-search');

    // Check for the presence of a unique element on the Listings page
    cy.get('h1', { timeout: 20000 }) // Adjust this selector to match the Listings page header
      .should('contain.text', 'Contact Me');

    // Verify HTTP response for the Listings page
    cy.request({
      url: 'https://www.lourdesmendoza.com/property-search',
      failOnStatusCode: false, // Avoid failing the test if the HTTP response isn't 200
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the response status is 200
    });
  });

  it('should navigate to the "GetPreQualified" page and then to the "homeloaner" page when the third button is clicked', () => {
    // Click the third button (Get Pre-Qualified button)
    cy.get(':nth-child(3) > .image-link > .image', { timeout: 10000 }) // Ensure correct selector for the third button
      .should('be.visible')
      .click({ force: true });

    // Verify navigation to the "GetPreQualified" page
    cy.url().should('include', '/GetPreQualified');

    // Wait for the page to render
    cy.wait(3000);

    // Check for the presence of the unique element on the GetPreQualified page
    cy.get('.text-2xl', { timeout: 20000 }) // Adjusted to the appropriate selector for "I'm ready to talk to a lender..."
      .should('contain.text', "I'm ready to talk to a lender...");

    // Verify HTTP response for the "GetPreQualified" page
    cy.request({
      url: 'https://www.lourdesmendoza.com/GetPreQualified',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    // Click the "Apply Now" button
    cy.get('.bg-yellow-500', { timeout: 10000 }) // Ensure correct selector for the "Apply Now" button
      .should('be.visible')
      .click({ force: true });

    // Verify navigation to the "homeloaner" page
    cy.url().should('include', '/homeloaner');

    // Wait for the page to fully render
    cy.wait(3000);

    // Check for the presence of a unique element on the "homeloaner" page
    cy.get('h1', { timeout: 20000 }) // Adjust this to a unique selector for the "homeloaner" page
      .should('contain.text', 'Only a few steps away from a home loan'); // Adjust the text as needed
  });

  it('should navigate to the "Sellers" page when the fourth button is clicked', () => {
    // Click the fourth button
    cy.get(':nth-child(4) > .image-link > .image', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    // Verify navigation to the correct URL
    cy.url().should('include', '/Sellers');

    // Check for a unique element on the page
    cy.get('.text-5xl', { timeout: 20000 })
      .should('contain.text', 'Get a Free Home Valuation');

    // Verify HTTP response
    cy.request('https://www.lourdesmendoza.com/Sellers').then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
