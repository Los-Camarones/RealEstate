import React from 'react'
import Idx from './page'

describe('<Idx />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Idx />)
  })
})