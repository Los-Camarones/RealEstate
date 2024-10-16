import React from 'react'
import HomePageContent from './HomePageContent'
import { mount } from 'cypress/react'

describe('<HomePageContent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<HomePageContent />)
  })
})