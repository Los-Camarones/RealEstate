module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    '**/__tests__/**/*.(test|spec).ts?(x)', 
    '**/__tests__/**/*.ts?(x)', // Ensures all test files within __tests__ directories are considered
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'], // Ignoring node_modules and build directories
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
};
