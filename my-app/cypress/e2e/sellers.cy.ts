// File: cypress/e2e/SellersPage.cy.ts
/// <reference types="cypress" />

describe('Sellers Page', () => {
  // Prevent Cypress from failing the test due to uncaught exceptions related to cross-origin scripts
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test due to hydration or cross-origin issues
    return false;
  });

  it('should load the Sellers page', () => {
    // Visit the Sellers page
    cy.visit('https://www.lourdesmendoza.com/Sellers');

    // Verify the URL is correct
    cy.url().should('include', '/Sellers');
  });

  it('should load the detailed Sellers page with query parameters', () => {
    // Visit the Sellers page with query parameters
    cy.visit(
      'https://www.lourdesmendoza.com/Sellers?boardId=6&boundaryWKT=POLYGON%28%28-121.91719040624972%2038.731117804023995%2C-120.81855759374966%2038.731117804023995%2C-120.81855759374966%2038.08545603686679%2C-121.91719040624972%2038.08545603686679%2C-121.91719040624972%2038.731117804023995%29%29&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0'
    );

    // Verify the URL includes specific query parameters
    cy.url().should('include', 'boardId=6');
    cy.url().should('include', 'boundaryWKT');
    cy.url().should('include', 'bedrooms=0');
    cy.url().should('include', 'bathCount=0');
    cy.url().should('include', 'propertyType=SFR,CND');
    cy.url().should('include', 'status=active');
  });

  it('should display the Sellers page content', () => {
    // Visit the Sellers page with query parameters
    cy.visit(
      'https://www.lourdesmendoza.com/Sellers?boardId=6&boundaryWKT=POLYGON%28%28-121.91719040624972%2038.731117804023995%2C-120.81855759374966%2038.731117804023995%2C-120.81855759374966%2038.08545603686679%2C-121.91719040624972%2038.08545603686679%2C-121.91719040624972%2038.731117804023995%29%29&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0'
    );

    // Verify the Sellers content container is visible
    cy.get('.ihf-container').should('be.visible'); // Replace `.ihf-container` with the actual class or ID from the page
  });

  it('should display the "Get a Free Home Valuation" text', () => {
    // Visit the Sellers page
    cy.visit('https://www.lourdesmendoza.com/Sellers');

    // Verify the "Get a Free Home Valuation" text is visible
    cy.get('.text-5xl').should('be.visible').and('contain.text', 'Get a Free Home Valuation');
  });
});
