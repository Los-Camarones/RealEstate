// File: cypress/e2e/admin.cy.ts
/// <reference types="cypress" />

import '../support/commands';

/*
  Scope: ADMIN ACCESS
  * Should get sign in page if not authenticated already
  * Should succesfully authenticate with right credentials
*/

describe('Admin Dashboard Access', () => {
  it('should not allow access to the admin page without proper authentication', () => {
    // Attempt to visit the admin dashboard directly
    cy.visit('https://www.lourdesmendoza.com/Admin');

    // Simulate a click before the wait statement
    cy.get('body').click();

    // Check if the user is redirected to the sign-in page
    cy.url().should('include', '/Sign-in');

    // Optionally check if the sign-in page content is displayed
    cy.contains('Sign In').should('be.visible');
  });

  it('should allow access to the admin page with proper authentication', () => {
    // Simulate login with proper credentials
    cy.login(Cypress.env('IHOMEFINDER_USERNAME'), Cypress.env('IHOMEFINDER_PASSWORD')); // Using environment variables for credentials

    // Visit the admin dashboard
    cy.visit('https://www.lourdesmendoza.com/Admin');

    ;
  });


  it('should verify the presence of admin panel menu items', () => {
    // Simulate login with proper credentials
    cy.login(Cypress.env('IHOMEFINDER_USERNAME'), Cypress.env('IHOMEFINDER_PASSWORD')); // Using environment variables for credentials
    cy.visit('https://www.lourdesmendoza.com/Admin');

    // Verify the presence of the Admin Panel menu items
    cy.get('ul > :nth-child(1) > .flex').should('contain.text', 'Dashboard');
    cy.get('ul > :nth-child(2) > .flex').should('contain.text', 'Leads/Subscribers');
    cy.get('ul > :nth-child(3) > .flex').should('contain.text', 'Client Interactions');
    cy.get('ul > :nth-child(4) > .flex').should('contain.text', 'Properties');
    cy.get('ul > :nth-child(5) > .flex').should('contain.text', 'Reports');
    cy.get('ul > :nth-child(6) > .flex').should('contain.text', 'Content Management');
    cy.get('ul > :nth-child(7) > .flex').should('contain.text', 'Settings');
  });

  it('should verify the presence of key sections on the Admin Dashboard', () => {
    // Simulate login with proper credentials
    cy.login(Cypress.env('IHOMEFINDER_USERNAME'), Cypress.env('IHOMEFINDER_PASSWORD')); // Using environment variables for credentials
    cy.visit('https://www.lourdesmendoza.com/Admin');
    
    // Check that the page content is loaded properly
    cy.contains('Welcome to the Admin Dashboard, Lourdes!').should('be.visible')

    // Check the Admin Panel title
    cy.get('div.navbar-container > .text-2xl').should('contain.text', 'Admin Panel');

    // Check the Admin Dashboard heading
    cy.get('.text-4xl').should('contain.text', 'Admin Dashboard');

    // Verify the welcome message
    cy.get(':nth-child(2) > .flex-1 > :nth-child(2)').should('contain.text', 'Welcome to the Admin Dashboard, Lourdes!');

    // Verify the Users section
    cy.get(':nth-child(1) > .text-xl').should('contain.text', 'Users');

    // Verify the Reports section
    cy.get(':nth-child(2) > .text-xl').should('contain.text', 'Reports');

    // Verify the System Health section
    cy.get(':nth-child(3) > .text-xl').should('contain.text', 'System Health');
  });
});


  /*
    Scope: DASHBOARD SCAN
    * Check for the page features
  */

describe('Verify Key Sections on the Admin Dashboard', () => {
  beforeEach(() => {
    // Simulate login before each sub-test
    cy.login(Cypress.env('IHOMEFINDER_USERNAME'), Cypress.env('IHOMEFINDER_PASSWORD'));
    cy.visit('https://www.lourdesmendoza.com/Admin');
  });

  it('should verify the presence of key sections on the Admin Dashboard', () => {
    // Ensure the page contains the expected main element before proceeding
    cy.contains('Admin Dashboard').should('be.visible');

    // Check the Admin Panel title with debugging
    cy.get('div.navbar-container > .text-2xl').debug().should('contain.text', 'Admin Panel');

    // Check the Admin Dashboard heading
    cy.get('.text-4xl').should('contain.text', 'Admin Dashboard');

    // Verify the welcome message
    cy.get(':nth-child(2) > .flex-1 > :nth-child(2)').should('contain.text', 'Welcome to the Admin Dashboard, Lourdes!');

    // Verify the Users section
    cy.get(':nth-child(1) > .text-xl').should('contain.text', 'Users');

    // Verify the Reports section
    cy.get(':nth-child(2) > .text-xl').should('contain.text', 'Reports');

    // Verify the System Health section
    cy.get(':nth-child(3) > .text-xl').should('contain.text', 'System Health');
  });
});




  /*
    Scope: LEADS LIST NAVIGATION
    *  Verify that all the subsections show in the menu
    *  Verify that all the subsections re-direct correctly
    *  Per page make sure teh correct assets render
  */
    describe('Verify Leads List Navigation', () => {
      beforeEach(() => {
        // Simulate login before each sub-test
        cy.login(Cypress.env('IHOMEFINDER_USERNAME'), Cypress.env('IHOMEFINDER_PASSWORD'));
        cy.visit('https://www.lourdesmendoza.com/Admin');
      });
  
      it('should show Leads List submenu and navigate to Lead List page', () => {
        // Click on the Leads/Subscribers menu item
        cy.get('ul > :nth-child(2) > .flex').click();
  
        // Verify the Leads List submenu appears
        cy.get('.text-base').should('contain.text', 'Leads List').click();
  
        // Verify navigation to the Lead List page
        cy.url().should('include', '/Admin/lead-list');
  
        // Verify key elements on the Lead List page
        cy.get('.bg-blue-500.px-4').should('be.visible').and('contain.text', 'Add New');
        cy.get('div.p-4 > .items-center > .flex-grow').should('be.visible');
        cy.get('thead > .bg-gray-200 > :nth-child(1)').should('contain.text', 'Name');
        cy.get('thead > .bg-gray-200 > :nth-child(2)').should('contain.text', 'Email');
        cy.get('thead > .bg-gray-200 > :nth-child(3)').should('contain.text', 'Phone');
        cy.get('thead > .bg-gray-200 > :nth-child(4)').should('contain.text', 'Actions');
      });
  
    });
  
  
  
    

  /*
    Scope:
    * 
    * 
  */

describe('Verify Client Interactions Submenu Items', () => {
  beforeEach(() => {
    // Simulate login before each sub-test
    cy.login(Cypress.env('IHOMEFINDER_USERNAME'), Cypress.env('IHOMEFINDER_PASSWORD'));
    cy.visit('https://www.lourdesmendoza.com/Admin');
  });

  it('should verify Contact Requests submenu item and redirect correctly', () => {
    cy.get(':nth-child(3) > .flex').click();
    cy.get(':nth-child(1) > .text-base').should('contain.text', 'Contact Requests').click();
    cy.url().should('include', '/Admin/contact-requests');
  });

  it('should verify Request Showing submenu item and redirect correctly', () => {
    cy.get(':nth-child(3) > .flex').click();
    cy.get(':nth-child(2) > .text-base').should('contain.text', 'Request Showing').click();
    cy.url().should('include', '/Admin/scheduleShowingRequests');
  });

  it('should verify Valuation Requests submenu item and redirect correctly', () => {
    cy.get(':nth-child(3) > .flex').click();
    cy.get(':nth-child(3) > .text-base').should('contain.text', 'Valuation Requests').click();
    cy.url().should('include', '/Admin/valuation-requests');
  });

  it('should verify More Info Requests submenu item and redirect correctly', () => {
    cy.get(':nth-child(3) > .flex').click();
    cy.get(':nth-child(4) > .text-base').should('contain.text', 'More Info Requests').click();
    cy.url().should('include', '/Admin/more-info-requests');
  });

  it('should verify Market Sign up Request submenu item and redirect correctly', () => {
    cy.get(':nth-child(3) > .flex').click();
    cy.get(':nth-child(5) > .text-base').should('contain.text', 'Market Sign up Request').click();
    cy.url().should('include', '/Admin/market-report-signup-requests');
  });

  it('should verify Open Home Report Signup Requests submenu item and redirect correctly', () => {
    cy.get(':nth-child(3) > .flex').click();
    cy.get(':nth-child(6) > .text-base').should('contain.text', 'Open Home Report Signup Requests').click();
    cy.url().should('include', '/Admin/open-home-report-signup-requests');
  });

  it('should verify Schedule Showing Requests submenu item and redirect correctly', () => {
    cy.get(':nth-child(3) > .flex').click();
    cy.get(':nth-child(7) > .text-base').should('contain.text', 'Schedule Showing Requests').click();
    cy.url().should('include', '/Admin/scheduleShowingRequests');
  });

  it('should verify Email Update Sign-up Requests submenu item and redirect correctly', () => {
    cy.get(':nth-child(3) > .flex').click();
    cy.get(':nth-child(8) > .text-base').should('contain.text', 'Email Update Sign-up Requests').click();
    cy.url().should('include', '/Admin/email-updates');
  });
});


describe('Verify Properties Navigation', () => {
  beforeEach(() => {
    // Simulate login before each sub-test
    cy.login(Cypress.env('IHOMEFINDER_USERNAME'), Cypress.env('IHOMEFINDER_PASSWORD'));
    cy.visit('https://www.lourdesmendoza.com/Admin');
  });

  it('should navigate to the Property Listings page', () => {
    // Click on the Properties menu item
    cy.get(':nth-child(4) > .flex').click();

    // Verify the Property Listings submenu appears and navigate to the page
    cy.get('.text-base').should('contain.text', 'Property Listings').click();

    // Verify redirection to the Property Listings page
    cy.url().should('include', '/Admin/property-listings');
  });

  it('should verify the assets on the Property Listings page', () => {
    // Navigate to the Property Listings page
    cy.get(':nth-child(4) > .flex').click();
    cy.get('.text-base').should('contain.text', 'Property Listings').click();

    // Verify key elements on the Property Listings page
    cy.get('.p-4 > .text-2xl').should('contain.text', 'Property Listings');
    cy.get('thead > .bg-gray-200 > :nth-child(1)').should('contain.text', 'Listing Number');
    cy.get('thead > .bg-gray-200 > :nth-child(2)').should('contain.text', 'Address');
    cy.get('thead > .bg-gray-200 > :nth-child(3)').should('contain.text', 'Bedrooms');
    cy.get('thead > .bg-gray-200 > :nth-child(4)').should('contain.text', 'Full Bathrooms');
    cy.get('thead > .bg-gray-200 > :nth-child(5)').should('contain.text', 'Partial Bathrooms');
    cy.get('thead > .bg-gray-200 > :nth-child(6)').should('contain.text', 'Square Feet');
    cy.get('thead > .bg-gray-200 > :nth-child(7)').should('contain.text', 'Description');
  });
});

    
describe('Verify Reports Navigation', () => {
  beforeEach(() => {
    // Simulate login before each sub-test
    cy.login(Cypress.env('IHOMEFINDER_USERNAME'), Cypress.env('IHOMEFINDER_PASSWORD'));
    cy.visit('https://www.lourdesmendoza.com/Admin');
  });

  it('should navigate to the Listing Report Signup Requests page when clicked', () => {
    // Click on the Reports menu item
    cy.get(':nth-child(5) > .flex').click();

    // Verify that the Listing Report Signup Requests submenu appears and navigate
    cy.get(':nth-child(1) > .text-base').should('contain.text', 'Listing Report Signup Requests').click();

    // Verify navigation to the correct URL
    cy.url().should('include', '/Admin/listing-report-signup-requests');
  });


  it('should navigate to the Market Trends page when clicked', () => {
    // Click on the Reports menu item
    cy.get(':nth-child(5) > .flex').click();

    // Verify that the Market Trends submenu appears and navigate
    cy.get(':nth-child(2) > .text-base').should('contain.text', 'Market Trends').click();

    // Verify navigation to the correct URL
    cy.url().should('include', '/Admin/Market');
  });


});





// Prevent Cypress from failing tests on uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent the test from failing
  return false;
});
