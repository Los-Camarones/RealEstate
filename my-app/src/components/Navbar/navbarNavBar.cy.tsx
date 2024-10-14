import React from 'react'
import NavBar from './navbar'

describe('<NavBar />', () => {
  it('renders', () => {
    cy.mount(<NavBar />)
  })
})