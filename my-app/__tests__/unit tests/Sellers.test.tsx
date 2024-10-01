import { render, screen, fireEvent } from '@testing-library/react';
import Sellers from '@/app/Sellers/page';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom/extend-expect';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Sellers Page', () => {
  
  // Test to check if the Navbar component is rendered
  it('renders the Navbar component', () => {
    render(<Sellers />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  // Test to check if the main title and sub-title are rendered
  it('renders the main title and sub-title', () => {
    render(<Sellers />);
    expect(screen.getByText(/Sellers Page is/i)).toBeInTheDocument();
    expect(screen.getByText(/Coming Soon/i)).toBeInTheDocument();
  });

  // Test to check if the countdown timer is rendered with the correct text
  it('renders the countdown timer with correct initial time', () => {
    render(<Sellers />);
    expect(screen.getByText(/Time Remaining:/i)).toBeInTheDocument();
    expect(screen.getByText(/\d+d \d+h \d+m \d+s/)).toBeInTheDocument(); // Check for the formatted time pattern
  });

  // Test to check if the wall clock is rendered correctly
  it('displays the wall clock in hh:mm:ss format', () => {
    render(<Sellers />);
    const clock = screen.getByText(/\d{2}:\d{2}:\d{2}/); // Check for the hh:mm:ss format
    expect(clock).toBeInTheDocument();
  });

  // Test to check if the background image is applied correctly
  it('applies the correct background image', () => {
    render(<Sellers />);
    const container = screen.getByRole('banner'); // Assuming the banner role is used for the main container
    expect(container).toHaveStyle(`background-image: url('/bailey-anselme-Bkp3gLygyeA-unsplash.jpg')`);
  });

  // Test the redirection button to /valuation
  it('navigates to /valuation when the button is clicked', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush }); // Properly mock useRouter
    render(<Sellers />);

    const button = screen.getByText(/Want to know how much your house is worth\? Click here/i);
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/valuation');
  });

  // Test to check if the email subscription input and button are rendered
  it('renders the email subscription input and button', () => {
    render(<Sellers />);
    const input = screen.getByPlaceholderText(/Enter your email/i);
    const button = screen.getByText(/Subscribe Now/i);
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  // Test to check if the About Us section is rendered
  it('renders the About Us section', () => {
    render(<Sellers />);
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/We are working on something amazing/i)).toBeInTheDocument();
  });

  // Test to check if the footer is rendered with correct copyright text
  it('renders the footer with correct copyright text', () => {
    render(<Sellers />);
    expect(screen.getByText(/© 2024 Lourdes Mendoza. All Rights Reserved./i)).toBeInTheDocument();
  });

});
