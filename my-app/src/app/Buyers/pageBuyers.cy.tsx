import React from 'react'
import Buyers from './page'
import { useRouter } from 'next/router';

describe('<Buyers />', () => {
  it('renders', () => {
    cy.mount(<Buyers />)
  })
})