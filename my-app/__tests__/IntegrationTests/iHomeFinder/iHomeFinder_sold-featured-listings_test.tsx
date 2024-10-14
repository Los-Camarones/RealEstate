// iHomeFinder_sold-featured-listings_test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom matchers for DOM assertions
import SoldFeaturedListingsPage from '../../../src/app/sold-featured-listings/page';

describe('SoldFeaturedListingsPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  // Test to verify script injection and widget rendering
  test('should inject script and render the sold featured listings widget on mount', () => {
    window.ihfKestrel = { render: jest.fn() }; // Mock ihfKestrel
    const { container } = render(<SoldFeaturedListingsPage />);
    const scriptElement = container.querySelector('script');
    
    // Verify the script is added
    expect(scriptElement).toBeInTheDocument();
    
    // Verify ihfKestrel.render() is called
    expect(window.ihfKestrel.render).toHaveBeenCalled();
  });

  // Test to log an error if ihfKestrel is undefined
  test('should log an error if ihfKestrel is undefined', () => {
    console.error = jest.fn(); // Mock console.error
    window.ihfKestrel = undefined; // Simulate ihfKestrel being undefined
    render(<SoldFeaturedListingsPage />);
    
    expect(console.error).toHaveBeenCalledWith('ihfKestrel is not defined or does not have a render method.');
  });

  // Test to verify script removal on component unmount
  test('should remove the script on unmount', () => {
    const { unmount, container } = render(<SoldFeaturedListingsPage />);
    const scriptElement = container.querySelector('script');
    
    // Verify script is initially present
    expect(scriptElement).toBeInTheDocument();
    
    // Unmount the component and check that the script is removed
    unmount();
    expect(container.querySelector('script')).not.toBeInTheDocument();
  });

  // Test to verify NavBar rendering and layout
  test('should render the NavBar and apply correct layout', () => {
    const { getByText } = render(<SoldFeaturedListingsPage />);
    expect(getByText('NavBar')).toBeInTheDocument(); // Assuming NavBar contains the text 'NavBar'
  });

  // Test to verify correct meta tags
  test('should set correct meta tags in the head', () => {
    render(<SoldFeaturedListingsPage />);
    expect(document.title).toBe('Sold Featured Listings');
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription?.getAttribute('content')).toBe(
      'Explore our sold featured listings. View details on recently sold properties, including photos and other relevant information.'
    );
  });
});
