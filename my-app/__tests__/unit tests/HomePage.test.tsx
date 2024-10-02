import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Page from '@/app/page';

describe('Home Page', () => {
  
  // Test to check if the Navbar component is rendered
  it('renders the Navbar component', () => {
    render(<Page />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  // Test to ensure the Carousel component is rendered with at least one image
  it('renders the Carousel with multiple images', () => {
    render(<Page />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  // Test to check if the SearchHomes component is rendered with the correct placeholder
  it('renders the SearchHomes component', () => {
    render(<Page />);
    expect(screen.getByPlaceholderText('Search homes...')).toBeInTheDocument(); 
  });

  // Test to ensure the ServiceList component is rendered with the text "Our Services"
  it('renders the ServiceList component', () => {
    render(<Page />);
    expect(screen.getByText('Our Services')).toBeInTheDocument(); 
  });

  // Test to check if the PhotoGallery component is rendered with the text "Explore by County"
  it('renders the PhotoGallery component', () => {
    render(<Page />);
    expect(screen.getByText('Explore by County')).toBeInTheDocument();
  });

  // Test to ensure the Reviews section is rendered with the text "Client Reviews"
  it('renders the Reviews section', () => {
    render(<Page />);
    expect(screen.getByText('Client Reviews')).toBeInTheDocument(); 
  });

  // Test to check if the Footer component is rendered with the copyright text
  it('renders the Footer component', () => {
    render(<Page />);
    expect(screen.getByText('© Big Block Realty North')).toBeInTheDocument(); 
  });

  // Test to ensure the SocialMediaLinks component is rendered
  it('renders the SocialMediaLinks component', () => {
    render(<Page />);
    expect(screen.getByRole('link', { name: /Instagram/i })).toBeInTheDocument(); // Checking for the Instagram link
  });

  // Test to ensure the HomePageContent component is rendered
  it('renders the HomePageContent component', () => {
    render(<Page />);
    expect(screen.getByText(/About Lourdes Mendoza/i)).toBeInTheDocument(); // Checking for unique text from the HomePageContent
  });

  // Test for the auto-play functionality of the Carousel (using jest timers)
  it('auto-plays the Carousel', () => {
    jest.useFakeTimers(); // Mock timers to control the carousel's interval
    render(<Page />);

    // Initially, the first image should be visible
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();

    // Fast-forward the carousel by 4 seconds (4000ms)
    jest.advanceTimersByTime(4000);

    // After 4 seconds, the second image should be visible
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();

    // Fast-forward the carousel by another 4 seconds
    jest.advanceTimersByTime(4000);

    // After 8 seconds in total, the third image should be visible
    expect(screen.getByAltText('Image 4')).toBeInTheDocument();
  });

});
