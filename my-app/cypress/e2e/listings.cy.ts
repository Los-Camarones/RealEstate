// File: cypress/e2e/ListingsPage.cy.ts
/// <reference types="cypress" />

describe('Listings Page', () => {
  // Prevent Cypress from failing the test due to uncaught exceptions related to cross-origin scripts
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test due to hydration or cross-origin issues
    return false;
  });

  it('should load the Listings page', () => {
    // Visit the Listings page
    cy.visit('https://www.lourdesmendoza.com/property-search/');

    // Verify the URL is correct
    cy.url().should('include', '/property-search');
  });

  it('should visit the detailed property search page with query parameters', () => {
    // Visit the detailed property search URL
    cy.visit(
      'https://www.lourdesmendoza.com/property-search?boardId=6&boundaryWKT=POLYGON%28%28-122.46650681250033%2039.403899053900915%2C-120.26924118750034%2039.403899053900915%2C-120.26924118750034%2037.40022936264528%2C-122.46650681250033%2037.40022936264528%2C-122.46650681250033%2039.403899053900915%29%29&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0'
    );

    // Verify the URL includes specific query parameters
    cy.url().should('include', 'boardId=6');
    cy.url().should('include', 'boundaryWKT');
    cy.url().should('include', 'bedrooms=0');
    cy.url().should('include', 'bathCount=0');
    cy.url().should('include', 'propertyType=SFR,CND');
    cy.url().should('include', 'status=active');
  });

  it('should display the listings container', () => {
    // Visit the detailed property search URL again for this test
    cy.visit(
      'https://www.lourdesmendoza.com/property-search?boardId=6&boundaryWKT=POLYGON%28%28-122.46650681250033%2039.403899053900915%2C-120.26924118750034%2039.403899053900915%2C-120.26924118750034%2037.40022936264528%2C-122.46650681250033%2037.40022936264528%2C-122.46650681250033%2039.403899053900915%29%29&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0'
    );

    // Verify the listings container is visible
    cy.get('.ihf-container').should('be.visible');
  });
});
