import '@testing-library/jest-dom/extend-expect'; // Import for jest-dom matchers
import { render } from '@testing-library/react';
import GallerySliderPage from '../../../src/app/gallery-slider/page';

// Mock ihfKestrel globally
beforeEach(() => {
  global.window.ihfKestrel = {
    render: jest.fn(),
  };
});

afterEach(() => {
  delete global.window.ihfKestrel; // Cleanup after each test
});

describe('iHomeFinder Gallery Slider Page Tests', () => {
  // 1. Script Injection and Widget Rendering
  it('should inject script and render the gallery slider widget on mount', () => {
    const { container } = render(<GallerySliderPage />);
    const scriptElement = container.querySelector('script');
    
    // Verify the script is added
    expect(scriptElement).not.toBeNull();
    
    // Use optional chaining to safely access the render function
    if (global.window.ihfKestrel) {
      expect(global.window.ihfKestrel.render).toHaveBeenCalledWith({
        "component": "gallerySliderWidget",
        "rows": 1,
        "navigation": true,
        "nav": "top",
        "auto": true,
        "maxResults": 25,
        "status": "active",
        "featured": true,
        "effect": "slide",
      });
    } else {
      fail('ihfKestrel is not defined');
    }
  });

  // 2. Widget Parameters Validation
  it('should pass correct configuration options to the gallery slider widget', () => {
    render(<GallerySliderPage />);
    
    if (global.window.ihfKestrel) {
      expect(global.window.ihfKestrel.render).toHaveBeenCalledWith({
        "component": "gallerySliderWidget",
        "rows": 1,
        "navigation": true,
        "nav": "top",
        "auto": true,
        "maxResults": 25,
        "status": "active",
        "featured": true,
        "effect": "slide",
      });
    }
  });

  // 3. Error Handling
  it('should log an error if ihfKestrel is undefined', () => {
    console.error = jest.fn(); // Mock console.error
    delete global.window.ihfKestrel; // Simulate ihfKestrel being undefined
    render(<GallerySliderPage />);
    
    expect(console.error).toHaveBeenCalledWith('ihfKestrel is not defined or does not have a render method.');
  });

  // 4. Script Cleanup on Unmount
  it('should remove the script and clear content on unmount', () => {
    const { unmount, container } = render(<GallerySliderPage />);
    const scriptElement = container.querySelector('script');
    
    // Verify script is initially present
    expect(scriptElement).not.toBeNull();
    
    // Unmount the component and check that the script is removed
    unmount();
    expect(container.querySelector('script')).toBeNull();
  });

  // 5. Ensure Consistent Layout
  it('should render the NavBar and apply correct layout', () => {
    const { getByText } = render(<GallerySliderPage />);
    expect(getByText('NavBar')).toBeInTheDocument(); // Assuming NavBar contains the text 'NavBar'
  });
  
  it('should set correct meta tags in the head', () => {
    render(<GallerySliderPage />);
    expect(document.title).toBe('Gallery Slider');
    
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    expect(metaDescription).not.toBeNull();
    expect(metaDescription.content).toBe('Explore featured properties with our gallery slider showcasing active listings in the market.');
  });
});
