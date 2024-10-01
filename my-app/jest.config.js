module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  };
  