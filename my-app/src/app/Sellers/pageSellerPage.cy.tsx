import React from 'react';
import SellerPage from './page';

describe('<SellerPage />', () => {
  beforeEach(() => {
    // Ensure ihfKestrel exists on window
    if (!window.ihfKestrel) {
      window.ihfKestrel = {
        render: () => document.createElement('div'), // Mock render method as an HTMLElement
        config: {
          activationToken: 'test-token', // Mock necessary config values
        }
      };
    }
  });

  it('renders the Sell My House title', () => {
    // Mount the SellerPage component
    cy.mount(<SellerPage />);

    // Target the title and check if it contains the correct text
    cy.get('.title').should('contain.text', 'Sell My House');
  });
});
