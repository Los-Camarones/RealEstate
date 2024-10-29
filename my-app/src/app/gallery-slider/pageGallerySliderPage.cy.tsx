import React from 'react'
import GallerySliderPage from './page'

describe('<GallerySliderPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GallerySliderPage />)
  })
})