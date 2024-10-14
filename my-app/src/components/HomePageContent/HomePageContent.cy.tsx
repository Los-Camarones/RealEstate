import React from 'react'
import HomePageContent from './HomePageContent'

describe('<HomePageContent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HomePageContent />)
  })
})