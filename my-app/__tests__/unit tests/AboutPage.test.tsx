import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Aboutme from '@/app/Aboutme/page'; // Correct component import

describe('About Me Page', () => {

  it('renders the Navbar component', () => {
    render(<Aboutme />);
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // Navbar role check
  });

  it('renders the main heading with Lourdes Mendoza', () => {
    render(<Aboutme />);
    expect(screen.getByText('Lourdes Mendoza')).toBeInTheDocument(); // Main heading check
  });

  it('renders the Realtor description', () => {
    render(<Aboutme />);
    expect(screen.getByText('Local Sacramento Realtor')).toBeInTheDocument();
  });

  it('renders the image of Lourdes Mendoza', () => {
    render(<Aboutme />);
    expect(screen.getByAltText('Lourdes Mendoza')).toBeInTheDocument();
  });

  it('renders the "Serving The City of Trees" section', () => {
    render(<Aboutme />);
    expect(screen.getByText('Serving The City of Trees')).toBeInTheDocument();
    expect(screen.getByText(/buy and sell real estate in the Greater Sacramento area/i)).toBeInTheDocument();
  });

  it('renders the images in the sections', () => {
    render(<Aboutme />);
    expect(screen.getByAltText('Sacramento Trees')).toBeInTheDocument();
    expect(screen.getByAltText('Sacramento Bridge')).toBeInTheDocument();
    expect(screen.getByAltText('Midtown Sacramento')).toBeInTheDocument();
  });

  it('renders the ContactMe component in the footer', () => {
    render(<Aboutme />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/contact me/i)).toBeInTheDocument();
  });
});
