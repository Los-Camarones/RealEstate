import NavBar from '../../components/Navbar/navbar';
import React from 'react';
import SignIn from '../../components/SignIn/SignIn';
import "../globals.css";

const LoginPage: React.FC = () => {
  return (
    <main style={mainStyle}>
      <header style={headerStyle}>
        <NavBar />
      </header>
      <div style={containerStyle}>
        <div style={loginBoxStyle}>
          <SignIn />  {/* This should handle authentication logic */}
        </div>
      </div>
    </main>
  );
};

// Header Style: Full-width navbar
const headerStyle = {
  width: '100%',
  backgroundColor: '#fff',  // Optional background color for better visibility
  padding: '0px 0',
};

// Main Style: Full-height, center content
const mainStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: 'url(picture2.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backdropFilter: 'blur(6px)',  // Adds a blur effect for clarity on top of the background
};

// Container Style: Center the login box
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

// Login Box Style: Make the box more readable with transparency and shadow
const loginBoxStyle = {
  padding: '40px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',  // Slightly more opaque background
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',  // Enhanced shadow
  maxWidth: '500px',
  width: '100%',
  textAlign: 'center' as 'center',
};

export default LoginPage;
