// File: cypress/e2e/PreQualified.cy.ts
/// <reference types="cypress" />

describe('Get PreQualified Page', () => {
  // Prevent Cypress from failing the test due to uncaught exceptions related to cross-origin scripts
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test due to hydration or cross-origin issues
    return false;
  });

  it('should load the Get PreQualified page and verify button redirect', () => {
    // Visit the Get PreQualified page
    cy.visit('https://www.lourdesmendoza.com/GetPreQualified');

    // Verify the button is visible
    cy.get('.bg-yellow-500').should('be.visible');

    // Click on the button
    cy.get('.bg-yellow-500').click();

    // Verify the redirection to the homeloaner page
    cy.url().should('include', '/homeloaner');
  });

  it('should display the form when "I\'m thinking about buying" button is clicked', () => {
    // Visit the homeloaner page directly
    cy.visit('https://www.lourdesmendoza.com/homeloaner');

    // Verify the "I'm thinking about buying" button is visible
    cy.get('.grid > :nth-child(1)').should('be.visible');

    // Click on the "I'm thinking about buying" button
    cy.get('.grid > :nth-child(1)').click();

    // Verify that the form appears
    cy.get('.bg-gradient-to-r > .bg-white').should('be.visible');
  });

  it('should display the form when "Touring open houses" button is clicked', () => {
    cy.visit('https://www.lourdesmendoza.com/homeloaner');

    // Verify the "Touring open houses" button is visible
    cy.get('.grid > :nth-child(2)').should('be.visible');

    // Click on the "Touring open houses" button
    cy.get('.grid > :nth-child(2)').click();

    // Verify that the form appears
    cy.get('.bg-gradient-to-r > .bg-white').should('be.visible');
  });

  it('should display the form when "Making offers on a property" button is clicked', () => {
    cy.visit('https://www.lourdesmendoza.com/homeloaner');

    // Verify the "Making offers on a property" button is visible
    cy.get('.grid > :nth-child(3)').should('be.visible');

    // Click on the "Making offers on a property" button
    cy.get('.grid > :nth-child(3)').click();

    // Verify that the form appears
    cy.get('.bg-gradient-to-r > .bg-white').should('be.visible');
  });

  it('should display the form when "I\'ve signed a purchase contract" button is clicked', () => {
    cy.visit('https://www.lourdesmendoza.com/homeloaner');

    // Verify the "I've signed a purchase contract" button is visible
    cy.get('.grid > :nth-child(4)').should('be.visible');

    // Click on the "I've signed a purchase contract" button
    cy.get('.grid > :nth-child(4)').click();

    // Verify that the form appears
    cy.get('.bg-gradient-to-r > .bg-white').should('be.visible');
  });
});
