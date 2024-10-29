describe('Render About Me', () => {
  // Prevent Cypress from failing the test due to uncaught exceptions

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test due to hydration or cross-origin issues
    return false;
  });

  it('should check if ihf-container is visible', () => {
    // Visit the About Me page
    cy.visit('https://www.lourdesmendoza.com/Aboutme');

    // Verify that the ihf-container is visible
    cy.get('.ihf-container', { timeout: 10000 }).should('be.visible').should('exist');
  });
});
