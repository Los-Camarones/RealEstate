import '@testing-library/jest-dom/extend-expect'; // Import for jest-dom matchers
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactPage from '../../../src/app/contact/page';

// Mock ihfKestrel globally
beforeEach(() => {
  global.window.ihfKestrel = {
    render: jest.fn(),
  };
});

afterEach(() => {
  delete global.window.ihfKestrel; // Cleanup after each test
});

describe('iHomeFinder Contact Page Tests', () => {
  // 1. Script Injection and Widget Rendering
  it('should inject script and render the contact widget on mount', () => {
    const { container } = render(<ContactPage />);
    const scriptElement = container.querySelector('script');
    
    // Verify the script is added
    expect(scriptElement).not.toBeNull(); // Ensure script element exists
    
    // Ensure ihfKestrel.render() is called
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
    render(<ContactPage />);
    
    expect(console.error).toHaveBeenCalledWith('ihfKestrel is not defined or does not have a render method.');
  });

  // 3. Script Cleanup on Unmount
  it('should remove the script and clear content on unmount', () => {
    const { unmount, container } = render(<ContactPage />);
    const scriptElement = container.querySelector('script');
    
    // Verify script is initially present
    expect(scriptElement).not.toBeNull();
    
    // Unmount the component and check that the script is removed
    unmount();

    const scriptAfterUnmount = container.querySelector('script');
    expect(scriptAfterUnmount).toBeNull(); // Check that the script is no longer present

    const divElement = container.querySelector('div');
    if (divElement) {
      expect(divElement.innerHTML).toBe(''); // Ensure content is cleared if div exists
    }
  });

  // 4. Link and Button Functionality
  it('should render the referral button and navigate to /Referrals on click', () => {
    const { getByText } = render(<ContactPage />);
    const referralButton = getByText('Check out my list of referrals');
    
    // Verify button is rendered
    expect(referralButton).toBeInTheDocument();
    
    // Simulate click and check navigation
    fireEvent.click(referralButton);
    expect(window.location.pathname).toBe('/Referrals');
  });

  // 5. SEO Meta Tags
  it('should set correct meta tags in the head', () => {
    render(<ContactPage />);
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    
    expect(metaDescription).not.toBeNull();
    expect(metaDescription.content).toBe(
      "Get in touch with us for any inquiries, questions, or feedback. We're here to assist you with all your real estate needs."
    );
  });

  // 6. Basic UI Testing
  it('should render the header with the correct message', () => {
    const { getByText } = render(<ContactPage />);
    expect(getByText('Send me a message!')).toBeInTheDocument();
  });
});
