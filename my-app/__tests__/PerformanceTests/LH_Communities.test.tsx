import { exec } from 'child_process';
import fs from 'fs';
import { AuditRef, LighthouseReport } from '../types'; // Ensure the correct path to types

const path = './__tests__/PerformanceTests/reports/communities-page-report.json';

describe('Communities Page Performance Tests', () => {

  // 1. Run Lighthouse performance test for the Communities page
  it('should run Lighthouse performance test for the Communities page', (done: jest.DoneCallback) => {
    exec(
      'lighthouse http://localhost:3000/markets --output=json --output-path=./__tests__/PerformanceTests/reports/communities-page-report.json',
      (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }
        console.log(`Lighthouse stdout: ${stdout}`);
        console.error(`Lighthouse stderr: ${stderr}`);
        done();
      }
    );
  }, 30000); // Set the timeout to 30 seconds for this test

  // 2. Read the report and analyze key performance metrics
  it('should analyze Lighthouse report and ensure key performance metrics are met', (done: jest.DoneCallback) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading report: ${err}`);
        return;
      }

      const report: LighthouseReport = JSON.parse(data);

      // Extract performance metrics from the report
      const metrics = report.categories.performance.auditRefs.reduce(
        (acc: Record<string, number>, auditRef: AuditRef) => {
          const { title, numericValue } = report.audits[auditRef.id];
          acc[title] = numericValue;
          return acc;
        },
        {}
      );

      // Log key metrics for debugging
      console.log('First Contentful Paint (FCP):', metrics['First Contentful Paint']);
      console.log('Time to Interactive (TTI):', metrics['Time to Interactive']);
      console.log('Largest Contentful Paint (LCP):', metrics['Largest Contentful Paint']);
      console.log('Total Blocking Time (TBT):', metrics['Total Blocking Time']);
      console.log('Cumulative Layout Shift (CLS):', metrics['Cumulative Layout Shift']);

      // Assert thresholds for key performance metrics
      expect(metrics['First Contentful Paint']).toBeLessThan(3000); // FCP should be less than 3 seconds
      expect(metrics['Time to Interactive']).toBeLessThan(5000);    // TTI should be less than 5 seconds
      expect(metrics['Largest Contentful Paint']).toBeLessThan(4000); // LCP should be less than 4 seconds
      expect(metrics['Total Blocking Time']).toBeLessThan(200);     // TBT should be less than 200 ms
      expect(metrics['Cumulative Layout Shift']).toBeLessThan(0.1); // CLS should be less than 0.1 (minimal layout shift)

      done();
    });
  }, 30000); // Set the timeout to 30 seconds for this test
});
