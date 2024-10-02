import '@testing-library/jest-dom'; 
import { render, screen } from '@testing-library/react';
import ValuationRequestPage from '@/app/valuation/page'; // Correct path to the component

describe('Valuation Request Page', () => {

  // Test to check if the NavBar component is rendered
  it('renders the NavBar component', () => {
    render(<ValuationRequestPage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // Assuming NavBar has the navigation role
  });

  // Test to check if the page has the correct title and meta description
  it('has the correct page title and meta description', () => {
    render(<ValuationRequestPage />);
    
    // Check if the title tag is correct
    const title = document.title;
    expect(title).toBe('Valuation Request');

    // Check if the meta description tag has the correct content
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toBe('Get an accurate valuation of your property. Request a free property valuation and find out the market value of your home today.');
  });

  // Test to check if the IDX Valuation Request widget script is injected
  it('injects the IDX Valuation Request widget script', () => {
    const { container } = render(<ValuationRequestPage />);
    
    // Check if the script element for the widget is injected
    const scriptElement = container.querySelector('script');
    expect(scriptElement).not.toBeNull();
  });

  // Test to check if the widget placeholder div is rendered
  it('renders the widget placeholder div', () => {
    const { container } = render(<ValuationRequestPage />);
    
    // Check if the placeholder div exists
    const widgetDiv = container.querySelector('div#widget-placeholder'); // Use a more specific selector if available
    expect(widgetDiv).toBeInTheDocument(); // Placeholder div for the widget should be rendered
  });
});
