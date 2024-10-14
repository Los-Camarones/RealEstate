// global.d.ts

declare global {
  interface Window {
    ihfKestrel?: {
      render: () => HTMLElement;
      config?: {
        activationToken?: string;
      };
    };
  }
}

export {}; // This ensures the file is treated as a module.
