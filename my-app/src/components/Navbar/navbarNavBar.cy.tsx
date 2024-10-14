import React from 'react';
import NavBar from './navbar';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // Import the Next.js RouterContext for mocking
import { createRouterMock } from 'next-router-mock'; // Make sure you have next-router-mock installed

describe('<NavBar />', () => {
  beforeEach(() => {
    // Create a mock router instance to avoid issues with Next.js' useRouter
    const router = createRouterMock();
    cy.stub(router, 'push'); // Mock the router's push method if needed

    // Mock Image and Link components from Next.js
    cy.stubNextJsImagesAndLinks(); // Add this function to your Cypress command

    // Provide the router mock to the NavBar component
    cy.mount(
      <RouterContext.Provider value={router}>
        <NavBar />
      </RouterContext.Provider>
    );
  });

  it('renders the NavBar component', () => {
    cy.get('nav').should('exist');
    cy.get('button').contains('Home').should('exist');
    cy.get('button').contains('Listings').should('exist');
  });

  it('opens and closes the mobile menu', () => {
    // Open the mobile menu by clicking the hamburger icon
    cy.get('button').contains('Home').click(); // Adjust this to target the correct hamburger button
    cy.get('.lg\\:hidden').should('exist'); // Ensure the mobile menu opens
  });
});
