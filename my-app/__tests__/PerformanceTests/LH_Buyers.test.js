const { exec } = require('child_process');
const fs = require('fs');

describe('Buyers Page Performance Tests', () => {
  // Test to run Lighthouse performance test for the Buyers page
  it('should run Lighthouse performance test for the buyers page', (done) => {
    exec('lighthouse http://localhost:3000/buyers --output=json --output-path=./__tests__/PerformanceTests/reports/buyers-page-report.json', (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      done();
    });
  }, 30000); // Set the timeout to 30 seconds

  // Test to analyze Lighthouse report and ensure key performance metrics for Buyers page
  it('should analyze Lighthouse report and ensure key performance metrics', (done) => {
    const path = './__tests__/PerformanceTests/reports/buyers-page-report.json';

    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading report: ${err}`);
        return;
      }

      const report = JSON.parse(data);

      const metrics = report.categories.performance.auditRefs.reduce((acc, auditRef) => {
        const { title, displayValue, numericValue } = report.audits[auditRef.id];
        acc[title] = { displayValue, numericValue };
        return acc;
      }, {});

      // Output key performance metrics
      console.log('First Contentful Paint (FCP):', metrics['First Contentful Paint'].numericValue);
      console.log('Time to Interactive (TTI):', metrics['Time to Interactive'].numericValue);
      console.log('Largest Contentful Paint (LCP):', metrics['Largest Contentful Paint'].numericValue);
      console.log('Total Blocking Time (TBT):', metrics['Total Blocking Time'].numericValue);
      console.log('Cumulative Layout Shift (CLS):', metrics['Cumulative Layout Shift'].numericValue);

      // Assertions for key metrics
      expect(metrics['First Contentful Paint'].numericValue).toBeLessThan(3000);
      expect(metrics['Time to Interactive'].numericValue).toBeLessThan(5000);
      expect(metrics['Largest Contentful Paint'].numericValue).toBeLessThan(4000);
      expect(metrics['Total Blocking Time'].numericValue).toBeLessThan(200);
      expect(metrics['Cumulative Layout Shift'].numericValue).toBeLessThan(0.1);

      done();
    });
  }, 30000); // Set the timeout to 30 seconds for this test as well
});
