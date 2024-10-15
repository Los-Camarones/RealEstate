import React from 'react';
import IHomeFinderContactWidget from './iHomeFinderContactWidget';

describe('<IHomeFinderContactWidget />', () => {
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

  it('renders the IHomeFinderContactWidget', () => {
    cy.mount(<IHomeFinderContactWidget />);
    
    // Example test for h1 element, modify based on your test case
    cy.get('h1').should('contain.text', 'Send me a message!');
  });
});
