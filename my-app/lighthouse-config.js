module.exports = {
    extends: 'lighthouse:default',
    settings: {
      // Force desktop emulation
      emulatedFormFactor: 'desktop',
      // Set viewport size to 1920x1080 for desktop simulation
      screenEmulation: {
        mobile: false,
        width: 1920,    // 1080p width
        height: 1080,   // 1080p height
        deviceScaleFactor: 1, // No scaling (normal desktop monitor)
        disabled: false // Enable screen emulation
      },
      // Adjust throttling settings to simulate a fast desktop connection
      throttling: {
        cpuSlowdownMultiplier: 1,  // No CPU slowdown
        rttMs: 40,                 // Simulated round-trip time
        throughputKbps: 10240      // Simulated throughput (10Mbps)
      },
      // Other desktop-friendly configurations
      formFactor: 'desktop',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    }
  };
  