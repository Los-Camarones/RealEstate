import React from 'react';
import Aboutme from './page';

describe('<Aboutme />', () => {
  before(() => {
    // Mocking ihfKestrel on the window object
    window.ihfKestrel = {
      render: () => document.createElement('div'), // Mocking render method
      config: {
        activationToken: 'test-token', // Mocking the activationToken in config
      },
    };
  });

  it('renders the About Me page with the image and text content', () => {
    cy.viewport(1920, 1080);
    cy.mount(<Aboutme />);

    // Target the image by class and ensure it's visible
    cy.get('.object-contain').should('be.visible');

    // Check that the image's `src` includes the correct path
    cy.get('.object-contain').should('have.attr', 'src').and('include', 'lourdes-removebg-preview.png');

    // Check the main title 'Lourdes Mendoza'
    cy.get('.text-4xl').should('contain.text', 'Lourdes Mendoza');

    // Check the subtitle 'Local Sacramento Realtor'
    cy.get('.text-2xl').should('contain.text', 'Local Sacramento Realtor');

    // Check the section title 'Serving The City of Trees'
    cy.get(':nth-child(3) > :nth-child(1) > .text-3xl').should('contain.text', 'Serving The City of Trees');

    // Check part of the description text under 'Serving The City of Trees'
    cy.get(':nth-child(3) > :nth-child(1) > .text-2xl').should('include.text', 'I consider myself extremely fortunate to be doing exactly what I want to do in life.');

    // Check the section title 'From Migrant Roots to Global Pursuits'
    cy.get(':nth-child(4) > :nth-child(2) > .text-3xl').should('contain.text', 'From Migrant Roots to Global Pursuits');

    // Check part of the description text under 'From Migrant Roots to Global Pursuits' using `include.text`
    cy.get(':nth-child(4) > :nth-child(2) > .text-2xl').should('include.text', 'Coming from an agricultural, migrant background, my parents did not have the means to pay for my college education');

    // Use cy.debug() to inspect the DOM structure before checking the next element
    cy.debug();

    // Adjusting the selector for 'Dedicated to Your Success in Real Estate' if needed
    cy.get(':nth-child(5) > :nth-child(1) > .text-3xl').should('contain.text', 'Dedicated to Your Success in Real Estate');

    // Check part of the description text under 'Dedicated to Your Success in Real Estate'
    cy.get(':nth-child(5) > :nth-child(1) > .text-2xl').should('include.text', 'I love working closely with individuals to help them achieve their dreams of homeownership.');
  });
});
