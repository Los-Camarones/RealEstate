import React from 'react'
import Contact from './ContactMe'

describe('<Contact />', () => {
  it('renders', () => {
    cy.mount(<Contact />)
  })
})