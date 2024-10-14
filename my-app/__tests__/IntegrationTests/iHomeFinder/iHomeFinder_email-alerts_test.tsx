import '@testing-library/jest-dom/extend-expect'; // Import for jest-dom matchers
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmailAlertsPage from '../../../src/app/email-alerts/page';

// Mock ihfKestrel globally
beforeEach(() => {
  global.window.ihfKestrel = {
    render: jest.fn(),
  };
});

afterEach(() => {
  delete global.window.ihfKestrel; // Cleanup after each test
});

describe('iHomeFinder Email Alerts Page Tests', () => {
  // 1. Script Injection and Widget Rendering
  it('should inject script and render the email alerts widget on mount', () => {
    const { container } = render(<EmailAlertsPage />);
    const scriptElement = container.querySelector('script');
    
    // Check if the script element exists before accessing it
    if (scriptElement) {
      // Verify the script is added
      expect(scriptElement).toBeInTheDocument(); // Script is in the DOM
    } else {
      fail('Script element not found');
    }
    
    // Ensure ihfKestrel.render() is called if ihfKestrel is defined
    if (global.window.ihfKestrel) {
      expect(global.window.ihfKestrel.render).toHaveBeenCalled();
    } else {
      fail('ihfKestrel is not defined');
    }
  });

  // 2. Error Handling
  it('should log an error if ihfKestrel is undefined', () => {
    console.error = jest.fn(); // Mock console.error
    delete global.window.ihfKestrel; // Simulate ihfKestrel being undefined
    render(<EmailAlertsPage />);
    
    expect(console.error).toHaveBeenCalledWith('ihfKestrel is not defined or does not have a render method.');
  });

  // 3. Script Cleanup on Unmount
  it('should remove the script and clear content on unmount', () => {
    const { unmount, container } = render(<EmailAlertsPage />);
    const scriptElement = container.querySelector('script');
    
    // Check if the script element exists before verifying
    if (scriptElement) {
      expect(scriptElement).toBeInTheDocument(); // Script is initially present
    } else {
      fail('Script element not found');
    }
    
    // Unmount the component and check that the script is removed
    unmount();
    expect(container.querySelector('script')).toBeNull(); // Script is removed
    expect(container.querySelector('div')?.innerHTML).toBe(''); // Ensure content is cleared
  });

  // 4. SEO Meta Tags
  it('should set correct meta tags in the head', () => {
    render(<EmailAlertsPage />);
    expect(document.title).toBe('Email Alerts');
    
    // Casting the meta tag as HTMLMetaElement
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    
    // Check if metaDescription exists before accessing its properties
    if (metaDescription) {
      expect(metaDescription.content).toBe('Stay updated with the latest property listings by setting up email alerts. Get notified as soon as new properties are available.');
    } else {
      fail('Meta description not found');
    }
  });

  // 5. Basic UI Testing (Optional)
  it('should render the NavBar', () => {
    const { getByText } = render(<EmailAlertsPage />);
    // Assuming NavBar contains the recognizable text 'NavBar'
    expect(getByText('NavBar')).toBeInTheDocument(); 
  });
});
