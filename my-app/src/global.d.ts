// global.d.ts

declare global {
  interface Window {
    ihfKestrel?: {
      render: () => HTMLElement;
    };
  }
}

export {}; // This ensures the file is treated as a module.
