import React from 'react';
import RecentlySoldHouses from './RecentlySoldHouses';

describe('<RecentlySoldHouses />', () => {
  beforeEach(() => {
    // Mock `ihfKestrel` to prevent errors from missing third-party functionality
    window.ihfKestrel = {
      render: () => document.createElement('div'), // Mock render function
    };
  });

  it('renders the component', () => {
    cy.mount(<RecentlySoldHouses />);
    cy.get('div').should('exist'); // Ensure the main div exists
  });

});
