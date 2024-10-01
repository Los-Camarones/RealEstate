import { render, screen } from '@testing-library/react';
import PropertySearchPage from '@/app/property-search/page';
import '@testing-library/jest-dom/extend-expect';

describe('Property Search Page', () => {
  
  // Test to check if the NavBar component is rendered
  it('renders the NavBar component', () => {
    render(<PropertySearchPage />);
    
    // We assume the NavBar component has a navigation role, so we check for its presence.
    expect(screen.getByRole('navigation')).toBeInTheDocument(); 
  });

  // Test to check if the property search widget script is injected
  it('renders the property search widget script', () => {
    // Render the component and get the container (HTML element) for further inspection
    const { container } = render(<PropertySearchPage />);
    
    // Check if a <script> element has been injected into the DOM to render the widget
    const scriptElement = container.querySelector('script');
    
    // Expect the script element to not be null, meaning it was successfully added
    expect(scriptElement).not.toBeNull(); 
  });

  // Test to check if the correct meta tags are included for SEO purposes
  it('includes the correct meta tags for SEO', () => {
    render(<PropertySearchPage />);
    
    // Check the document's title to ensure it's set correctly
    expect(document.title).toBe('PropertySearch');
    
    // Check the meta description tag and ensure it has the correct content
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute(
      'content',
      'Photos and Property Details for {listingAddress}. Get complete property information, maps, street view, schools, walk score and more. Request additional information, schedule a showing, save to your property organizer.'
    );
    
    // Check if the Open Graph image meta tag exists and has the correct content
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage).toHaveAttribute('content', '{listingPhotoUrl}');
  });

});
