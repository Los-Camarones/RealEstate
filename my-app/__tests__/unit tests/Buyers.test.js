import { render, screen, fireEvent } from '@testing-library/react';
import Buyers from '@/app/Buyers/page';
import { useRouter } from 'next/navigation';

// Mock the router for testing navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Buyers Page', () => {
  // Test to check if the NavBar component is rendered
  it('renders the NavBar component', () => {
    render(<Buyers />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  // Test to check if the page title and meta description are correct
  it('sets the correct page title and meta description', () => {
    render(<Buyers />);
    expect(document.title).toEqual('Buyers');
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toEqual('Discover our upcoming features for buyers. Stay tuned and get ready to explore your dream properties!');
  });

  // Test to check if the countdown timer renders
  it('renders the countdown timer', () => {
    render(<Buyers />);
    expect(screen.getByText(/Time Remaining:/i)).toBeInTheDocument();
  });

  // Test to check if the wall clock is rendered
  it('renders the wall clock', () => {
    render(<Buyers />);
    expect(screen.getByText(/:/)).toBeInTheDocument(); // Assuming the clock has colon separators
  });

  // Test to ensure the "Property Search" button is rendered and navigates correctly
  it('renders the "Property Search" button and handles click', () => {
    const mockRouter = useRouter();
    render(<Buyers />);
    
    const propertySearchButton = screen.getByRole('button', { name: /Property Search/i });
    expect(propertySearchButton).toBeInTheDocument();
    
    fireEvent.click(propertySearchButton);
    expect(mockRouter.push).toHaveBeenCalledWith('/property-search');
  });

  // Test to ensure the "Mortgage Calculator" button is rendered and navigates correctly
  it('renders the "Mortgage Calculator" button and handles click', () => {
    const mockRouter = useRouter();
    render(<Buyers />);

    const mortgageCalculatorButton = screen.getByRole('button', { name: /Mortgage Calculator/i });
    expect(mortgageCalculatorButton).toBeInTheDocument();

    fireEvent.click(mortgageCalculatorButton);
    expect(mockRouter.push).toHaveBeenCalledWith('/mortgage-calculator');
  });

  // Test to check if the subscription input and button are rendered
  it('renders the subscription input and button', () => {
    render(<Buyers />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const subscribeButton = screen.getByRole('button', { name: /Subscribe Now/i });

    expect(emailInput).toBeInTheDocument();
    expect(subscribeButton).toBeInTheDocument();
  });

  // Test to check if the footer is rendered with the correct text
  it('renders the footer with the correct copyright text', () => {
    render(<Buyers />);
    expect(screen.getByText('© 2024 Lourdes Mendoza. All Rights Reserved.')).toBeInTheDocument();
  });
});
