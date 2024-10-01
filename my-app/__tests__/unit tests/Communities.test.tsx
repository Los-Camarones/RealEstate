import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import MarketsPage from '@/app/markets/page'; // Update with the correct import

describe('Markets Page', () => {

  // Test to check if the NavBar component is rendered
  it('renders the NavBar component', () => {
    render(<MarketsPage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // Assuming NavBar has the navigation role
  });

  // Test to check if the heading and page content are rendered
  it('renders the Communities heading and description', () => {
    render(<MarketsPage />);
    
    // Checking if the main heading is rendered
    expect(screen.getByText('Communities')).toBeInTheDocument();
    
    // Checking if the description content is rendered
    expect(screen.getByText('Discover your ideal neighborhood. From vibrant cityscapes to serene suburbs, explore communities that match your lifestyle and preferences.')).toBeInTheDocument();
  });

  // Test to check if the footer is rendered with the expected copyright text
  it('renders the Footer component with copyright text', () => {
    render(<MarketsPage />);
    
    // Checking if the Footer contains the correct copyright information
    expect(screen.getByText('© 2024 Lourdes Mendoza. All Rights Reserved.')).toBeInTheDocument();
    
    // Checking for the IDX real estate information
    expect(screen.getByText('Real Estate IDX Powered by iHomefinder')).toBeInTheDocument();
  });

  // Optional: Test to check if the Framer Motion elements are initially hidden and become visible
  it('animates the main content on load', () => {
    const { container } = render(<MarketsPage />);
    
    // Check the initial opacity of the main content container
    const mainContent = container.querySelector('.relative.min-h-screen');
    expect(mainContent).toHaveStyle({ opacity: 0 });
    
    // -->IMPLEMENTATION NEEDED<--
    // We would need to mock the animation or wait for it to change to visible
    // You can use `waitFor` from `@testing-library/react` to wait for opacity to change
  });

  // Test to check if the widget script is injected (if applicable)
  it('injects the property search widget', () => {
    const { container } = render(<MarketsPage />);
    
    // Checking for the script element that should be injected for the property widget
    const scriptElement = container.querySelector('script');
    expect(scriptElement).not.toBeNull();
  });

});
