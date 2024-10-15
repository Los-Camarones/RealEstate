import React from 'react';
import PhotoGallery from './PhotoGallery';

describe('<PhotoGallery />', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080); // Setting the viewport for consistency
    cy.mount(<PhotoGallery />);
  });

  it('renders the PhotoGallery component', () => {
    cy.get('.photo-gallery').should('exist'); // Check if the gallery exists
  });

  it('renders the correct number of buttons', () => {
    cy.get('.photo button').should('have.length', 3); // Check for 3 buttons (one for each area)
  });

  it('checks that each button contains the correct text and is functional', () => {
    const areas = ['SACRAMENTO', 'YUBA CITY', 'ELK GROVE'];

    areas.forEach((area, index) => {
      // Check that the button exists and contains the "Explore" text
      cy.get(`:nth-child(${index + 1}) > a > .overlay > div > button`)
        .should('be.visible')
        .should('contain.text', 'Explore');
      
      // Verify that the button link navigates to the correct URL
      cy.get(`:nth-child(${index + 1}) > a`)
        .should('have.attr', 'href')
        .and('contain', 'https://www.lourdesmendoza.com/listing-report'); // Adjust based on actual links
    });
  });

  it('checks that clicking the buttons opens the correct link', () => {
    // Simulate clicking the first area's button (SACRAMENTO) to check for navigation
    cy.get(':nth-child(1) > a').then(($a) => {
      const href = $a.prop('href');
      cy.request(href).its('status').should('eq', 200); // Verify the link returns a successful status
    });

    // Repeat for the second and third areas
    cy.get(':nth-child(2) > a').then(($a) => {
      const href = $a.prop('href');
      cy.request(href).its('status').should('eq', 200);
    });

    cy.get(':nth-child(3) > a').then(($a) => {
      const href = $a.prop('href');
      cy.request(href).its('status').should('eq', 200);
    });
  });
});
