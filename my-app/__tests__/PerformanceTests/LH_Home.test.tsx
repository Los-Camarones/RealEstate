import { exec } from 'child_process';
import fs from 'fs';
import { AuditRef, LighthouseReport } from '../types'; // Ensure the correct path to types

const path = './__tests__/PerformanceTests/reports/home-page-report.json';

describe('Home Page Performance Tests', () => {
  // 1. Run Lighthouse performance test for the home page
  it('should run Lighthouse performance test for the home page', (done: jest.DoneCallback) => {
    exec(
      'lighthouse http://localhost:3000 --output=json --output-path=./__tests__/PerformanceTests/reports/home-page-report.json',
      (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        done();
      }
    );
  }, 30000); // Set the timeout to 30 seconds for this test

  // 2. Analyze Lighthouse report and ensure key performance metrics
  it('should analyze Lighthouse report and ensure key performance metrics', (done: jest.DoneCallback) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading report: ${err}`);
        return;
      }

      const report: LighthouseReport = JSON.parse(data);

      const metrics = report.categories.performance.auditRefs.reduce(
        (acc: Record<string, { displayValue?: string; numericValue: number }>, auditRef: AuditRef) => {
          const { title, numericValue, displayValue } = report.audits[auditRef.id];
          acc[title] = {
            numericValue,
            ...(displayValue && { displayValue }) // Add displayValue only if it exists
          };
          return acc;
        },
        {}
      );

      // Log key performance metrics
      console.log('First Contentful Paint (FCP):', metrics['First Contentful Paint'].numericValue);
      console.log('Time to Interactive (TTI):', metrics['Time to Interactive'].numericValue);
      console.log('Largest Contentful Paint (LCP):', metrics['Largest Contentful Paint'].numericValue);
      console.log('Total Blocking Time (TBT):', metrics['Total Blocking Time'].numericValue);
      console.log('Cumulative Layout Shift (CLS):', metrics['Cumulative Layout Shift'].numericValue);

      // Assertions for key performance metrics
      expect(metrics['First Contentful Paint'].numericValue).toBeLessThan(3000);
      expect(metrics['Time to Interactive'].numericValue).toBeLessThan(5000);
      expect(metrics['Largest Contentful Paint'].numericValue).toBeLessThan(4000);
      expect(metrics['Total Blocking Time'].numericValue).toBeLessThan(200);
      expect(metrics['Cumulative Layout Shift'].numericValue).toBeLessThan(0.1);

      done();
    });
  }, 30000); // Set the timeout to 30 seconds for this test
});
