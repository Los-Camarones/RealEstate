import React from 'react';
import Popup from './Popup';

describe('<Popup />', () => {
  it('does not render the pop-up content when show is false', () => {
    cy.mount(<Popup show={false} onClose={() => {}} />);
    cy.get('.popup-container').should('not.exist'); // Assuming you have a specific class for the popup container
  });

  it('renders when show is true', () => {
    cy.mount(<Popup show={true} onClose={() => {}} />);
    cy.get('div').should('exist'); // Popup should render when show is true
    cy.get('h2').should('contain.text', 'Welcome to Our Pop up!');
  });

  it('calls onClose when the close button is clicked', () => {
    const onCloseSpy = cy.spy().as('onCloseSpy');
    cy.mount(<Popup show={true} onClose={onCloseSpy} />);

    cy.get('button').contains('X').click();
    cy.get('@onCloseSpy').should('have.been.calledOnce'); // Ensure onClose was called once
  });
});
