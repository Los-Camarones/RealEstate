import React from 'react';
import ImageGallery from './ServiceList';


describe('<ImageGallery />', () => {
  beforeEach(() => {
    // Mount the component before each test
    cy.mount(<ImageGallery />);
  });


  it('renders the component', () => {
    // Ensure the main container is rendered
    cy.get('.image-container').should('exist');
  });


  it('renders the correct number of images', () => {
    // Check the number of images rendered
    cy.get('.image-wrapper').should('have.length', 4);
  });


  it('renders the correct captions', () => {
    // Check if each caption is rendered correctly
    const captions = [
      'How much is your home worth?',
      'Lets find your dream home',
      'Need a loan?',
      'For Sale'
    ];


    captions.forEach((caption, index) => {
      cy.get('.caption').eq(index).should('contain.text', caption);
    });
  });


  it('renders the correct image sources', () => {
    // Ensure each image has the correct source (src attribute)
    const imageSources = [
      '/picture1.jpg',
      '/picture2.jpg',
      '/picture3.jpg',
      '/picture4.jpg'
    ];


    imageSources.forEach((src, index) => {
      cy.get('.circular-image').eq(index).should('have.attr', 'src', src);
    });
  });


  it('has correct links for each image', () => {
    // Ensure that each image link has the correct href attribute
    const routes = [
      '/valuation',
      '/property-search',
      '/GetPreQualified',
      '/Sellers'
    ];


    routes.forEach((route, index) => {
      cy.get('.image-link').eq(index).should('have.attr', 'href', route);
    });
  });


  it('applies correct CSS classes', () => {
    // Check if the CSS classes are applied correctly to the images
    cy.get('.circular-image').should('have.class', 'circular-image');
    cy.get('.image-link').should('have.class', 'image-link');
  });
});


