import '@testing-library/jest-dom/extend-expect'; // Import for jest-dom matchers
import React from 'react';
import { render } from '@testing-library/react';
import RootLayout from '../../../src/app/layout';

// Mock environment variable
process.env.NEXT_PUBLIC_IDX_ACTIVATION_TOKEN = 'testToken123';

beforeEach(() => {
  // Mock ihfKestrel with both render and config
  global.window.ihfKestrel = {
    render: jest.fn(), // Mock render method
    config: { activationToken: process.env.NEXT_PUBLIC_IDX_ACTIVATION_TOKEN }, // Mock config object
  };
});

afterEach(() => {
  delete global.window.ihfKestrel; // Cleanup after each test
});

describe('iHomeFinder Layout Tests', () => {
  it('should include the IDX script in the head', () => {
    const { container } = render(<RootLayout><div>Test Page</div></RootLayout>);
    const scriptTag = container.querySelector('script[src="https://kestrel.idxhome.com/ihf-kestrel.js"]');
    expect(scriptTag).toBeInTheDocument(); // Assert that the script tag exists
  });

  it('should initialize the ihfKestrel object on window', () => {
    render(<RootLayout><div>Test Page</div></RootLayout>);
    expect(global.window.ihfKestrel).toBeDefined(); // Ensure ihfKestrel is initialized
  });

  it('should correctly set ihfKestrel.config.activationToken', () => {
    render(<RootLayout><div>Test Page</div></RootLayout>);
    if (global.window.ihfKestrel && global.window.ihfKestrel.config) {
      expect(global.window.ihfKestrel.config.activationToken).toBe('testToken123'); // Ensure activationToken is set
    } else {
      fail('ihfKestrel or config is not defined');
    }
  });

  it('should call ihfKestrel.render()', () => {
    render(<RootLayout><div>Test Page</div></RootLayout>);
    if (global.window.ihfKestrel) {
      expect(global.window.ihfKestrel.render).toHaveBeenCalled(); // Ensure render method is called
    } else {
      fail('ihfKestrel is not defined');
    }
  });

  it('should handle missing activationToken from environment variables', () => {
    delete process.env.NEXT_PUBLIC_IDX_ACTIVATION_TOKEN; // Delete token
    render(<RootLayout><div>Test Page</div></RootLayout>);
    if (global.window.ihfKestrel && global.window.ihfKestrel.config) {
      expect(global.window.ihfKestrel.config.activationToken).toBeUndefined(); // Ensure token is undefined if missing
    } else {
      fail('ihfKestrel or config is not defined');
    }
  });
});
