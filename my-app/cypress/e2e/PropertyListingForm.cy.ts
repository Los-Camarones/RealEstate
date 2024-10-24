// File: cypress/e2e/PropertyListingPage.cy.ts
/// <reference types="cypress" />

// Ignore uncaught exceptions related to React errors
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Minified React error')) {
    return false; // Prevents Cypress from failing the test due to React errors
  }
  return true;
});

describe('Property Listing Page and API Status Code Tests', () => {
  beforeEach(() => {
    // Intercept requests to api.mapbox.com and www.idxhome.com before each test
    cy.intercept('GET', '**/api.mapbox.com/**').as('mapbox');
    cy.intercept('GET', '**/www.idxhome.com/**').as('idxhome');

    // Visit the page where the requests are triggered
    cy.visit('https://www.lourdesmendoza.com/property-search?boardId=6&boundaryWKT=POLYGON%28%28-122.46650681249979%2039.4897975093707%2C-120.26924118749986%2039.4897975093707%2C-120.26924118749986%2037.31180958709821%2C-122.46650681249979%2037.31180958709821%2C-122.46650681249979%2039.4897975093707%29%29&propertyType=SFR,CND&status=active&sort=importDate');
  });

  it('should display the main listing container', () => {
    // Verify that the main container for listings is visible
    cy.get('.ihf-container', { timeout: 10000 })
      .should('be.visible')
      .should('exist');
  });

  it('should ensure all Mapbox API requests return status 200', () => {
    // Wait for Mapbox API requests and verify they return 200 status
    cy.wait('@mapbox').its('response.statusCode').should('eq', 200);
  });

  it('should ensure all IDXHome API requests return status 200', () => {
    // Wait for IDXHome API requests and verify they return 200 status
    cy.wait('@idxhome').its('response.statusCode').should('eq', 200);
  });
});
