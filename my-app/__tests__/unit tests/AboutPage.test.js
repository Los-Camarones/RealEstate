import { render, screen } from '@testing-library/react';
import Aboutme from '@/app/Aboutme/page'; // Correct component import

describe('About Me Page', () => {

  // Test to check if the NavBar component is rendered
  it('renders the Navbar component', () => {
    render(<Aboutme />);
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // Assuming Navbar has a navigation role
  });

  // Test to check if the correct main heading is rendered
  it('renders the main heading with Lourdes Mendoza', () => {
    render(<Aboutme />);
    expect(screen.getByText('Lourdes Mendoza')).toBeInTheDocument(); // Checking for main heading text
  });

  // Test to ensure the Realtor description is rendered
  it('renders the Realtor description', () => {
    render(<Aboutme />);
    expect(screen.getByText('Local Sacramento Realtor')).toBeInTheDocument();
  });

  // Test to check if the image of Lourdes is rendered
  it('renders the image of Lourdes Mendoza', () => {
    render(<Aboutme />);
    expect(screen.getByAltText('Lourdes Mendoza')).toBeInTheDocument();
  });

  // Test to ensure the description of 'Serving The City of Trees' section is rendered
  it('renders the "Serving The City of Trees" section', () => {
    render(<Aboutme />);
    expect(screen.getByText('Serving The City of Trees')).toBeInTheDocument();
    expect(screen.getByText(/buy and sell real estate in the Greater Sacramento area/i)).toBeInTheDocument(); // Check part of the description
  });

  // Test to check if the images in various sections are rendered
  it('renders the images in the sections', () => {
    render(<Aboutme />);
    expect(screen.getByAltText('Sacramento Trees')).toBeInTheDocument();
    expect(screen.getByAltText('Sacramento Bridge')).toBeInTheDocument();
    expect(screen.getByAltText('Midtown Sacramento')).toBeInTheDocument();
  });

  // Test to ensure the footer with ContactMe component is rendered
  it('renders the ContactMe component in the footer', () => {
    render(<Aboutme />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Assuming footer has a contentinfo role
    expect(screen.getByText(/contact me/i)).toBeInTheDocument(); // Checking for "Contact Me" text
  });
});
