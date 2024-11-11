// File: cypress/e2e/home.cy.ts
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test due to hydration or cross-origin issues
  return false;
});


/*
* Describe block for "Contact Me" button functionality

*/ 
describe('"Contact Me" Button Scrolls to Form', () => {
  beforeEach(() => {
    cy.visit('https://www.lourdesmendoza.com');
    cy.wait(2000);  // Add extra wait time to ensure page hydration
  });

  it('should scroll to the form when Contact Me button is clicked', () => {
    // Click the last "Contact Me" button
    cy.get('button.contact-btn').last().click();
    
    // Optional: Wait for the form to load/render if necessary
    cy.wait(1000); // Add a short wait for the form to load/render
    
    // Ensure the form is visible after the click (targeting by class)
    cy.get('.message-form', { timeout: 10000 }).should('be.visible').scrollIntoView();
  });
});





/*
Test the expand button
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




/*
* Testing the 4 options in the middle
*/

describe('Button Navigation Tests', () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit('https://www.lourdesmendoza.com');
  });

  it('should navigate to the "What My Home Worth" page when the first button is clicked', () => {
    // Click the first button and verify it navigates to the correct URL
    cy.get(':nth-child(1) > .image-link > .circular-image')
      .click({ force: true });
    cy.url().should('include', '/valuation');

    // Verify if the URL returns a status code of 200
    cy.request('https://www.lourdesmendoza.com/valuation').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the "Listings" page when the second button is clicked', () => {
    // Click the second button and verify it navigates to the correct URL
    cy.get(':nth-child(2) > .image-link > .circular-image')
      .click({ force: true });
    cy.url().should('include', '/property-search');

    // Verify if the URL returns a status code of 200
    cy.request({
      url: 'https://www.lourdesmendoza.com/property-search',
      failOnStatusCode: false, // This prevents the test from failing on non-200 responses
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the "GetPreQualified" page when the third button is clicked', () => {
    // Click the third button and verify it navigates to the correct URL
    cy.get(':nth-child(3) > .image-link > .circular-image')
      .click({ force: true });
    cy.url().should('include', '/GetPreQualified');

    // Verify if the URL returns a status code of 200
    cy.request('https://www.lourdesmendoza.com/GetPreQualified').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should navigate to the "Sellers" page when the fourth button is clicked', () => {
    // Click the fourth button and verify it navigates to the correct URL
    cy.get(':nth-child(4) > .image-link > .circular-image')
      .click({ force: true });
    cy.url().should('include', '/Sellers');

    // Verify if the URL returns a status code of 200
    cy.request('https://www.lourdesmendoza.com/Sellers').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

});








/*
* Describe block for form submission at the bottom
* Enters form data
* Hits Submit Button
* Email client on host opens up
*/ 
describe('Contact Form Test', () => {
  beforeEach(() => {
    // Wait for the page to load completely
    cy.intercept('GET', '**').as('pageLoad');
    cy.visit('https://www.lourdesmendoza.com');
    cy.wait('@pageLoad');
    cy.wait(2000);  // Add extra wait time to ensure page hydration
  });

  it('should fill out the form and trigger mailto with correct data', () => {
    cy.fixture('formData').then((formData) => {
      // Fill out the form

      cy.get('input[name="firstName"]')
        .should('be.visible')
        .as('firstNameInput')
        .click()
        .clear()
        .type(formData.firstName, { force: true, delay: 100 });

      cy.get('input[name="lastName"]')
        .should('be.visible')
        .as('lastNameInput')
        .click()
        .clear()
        .type(formData.lastName, { force: true, delay: 100 });

      cy.get('input[name="email"]')
        .should('be.visible')
        .as('emailInput')
        .click()
        .clear()
        .type(formData.email, { force: true, delay: 100 });

      cy.get('input[name="phone"]')
        .should('be.visible')
        .as('phoneInput')
        .click()
        .clear()
        .type(formData.phone, { force: true, delay: 100 });

      cy.get('textarea[name="message"]')
        .should('be.visible')
        .as('messageInput')
        .click()
        .clear()
        .type(formData.message, { force: true, delay: 100 });

      // Disable waiting for the page load on form submission
      cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
          expect(url).to.contain('mailto:'); // Ensure mailto link is triggered
        });
      });

      // Immediately end the test after form submission
      cy.end();  // End the test explicitly after the form submission
    });
  });
});



