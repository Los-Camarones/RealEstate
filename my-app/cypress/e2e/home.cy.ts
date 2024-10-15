// File: cypress/e2e/home.cy.ts
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test due to hydration or cross-origin issues
  return false;
});


/*
* Describe block for "Contact Me" button functionality
* FAILS, times out 
*/ 
describe('"Contact Me" Button Scrolls to Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
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
 * Tests the 3 city listings buttons:
 */
describe('City Navigation Tests', () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit('http://localhost:3000');
    cy.wait(1000); // Ensure the page is fully loaded
  });

  it('should navigate to the Sacramento listing report', () => {
    // Ensure the button is visible and clickable before clicking
    cy.get(':nth-child(1) > a')
      .should('have.attr', 'href', 'https://www.lourdesmendoza.com//listing-report?id=2816179') // Check the href attribute
      .click({ force: true });
    // Verify if the URL includes the Sacramento listing
    cy.url().should('include', 'https://www.lourdesmendoza.com/listing-report?id=2816179');
  });

  it('should navigate to the Yuba City listing report', () => {
    // Ensure the button is visible and clickable before clicking
    cy.get(':nth-child(2) > a')
      .should('have.attr', 'href', 'https://www.lourdesmendoza.com//listing-report?id=2816182') // Check the href attribute
      .click({ force: true });
    // Verify if the URL includes the Yuba City listing
    cy.url().should('include', 'https://www.lourdesmendoza.com/listing-report?id=2816182');
  });

  it('should navigate to the Elk Grove listing report', () => {
    // Ensure the button is visible and clickable before clicking
    cy.get(':nth-child(3) > a')
      .should('have.attr', 'href', 'https://www.lourdesmendoza.com//listing-report?id=2814737') // Check the href attribute
      .click({ force: true });
    // Verify if the URL includes the Elk Grove listing
    cy.url().should('include', 'https://www.lourdesmendoza.com/listing-report?id=2814737');
  });
});






/*
* Describe block for form submission at the bottom
* Enters form data
* Hits Submit Button
* Email client on host opens up
*/ 
describe('Form Submission with mailto', () => {
  beforeEach(() => {
    // Wait for the page to load completely
    cy.intercept('GET', '**').as('pageLoad');
    cy.visit('http://localhost:3000');
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

      // Submit the form and prevent Cypress from waiting for page load
      cy.get('form')
        .find('button[type="submit"]')
        .should('be.visible')
        .last()
        .click({ waitForAnimations: false, timeout: 0 });

      // Immediately end the test after form submission
      cy.end();  // End the test explicitly after the form submission
    });
  });
});



