import React from 'react';
import NavBar from './src/app/components/Navbar/navbar';

// since we are using TypeScript, we define the types of the props
type RootLayoutProps = {
  children: React.ReactNode; // This specifies that children can be any valid React node
};

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

// Apply the type to your functional component like this:
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <NavBar /> 
          
        {children}</body>
    </html>
  );
};

export default RootLayout;