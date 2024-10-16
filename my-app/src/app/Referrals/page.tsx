'use client';

import React, { useState, CSSProperties } from 'react';
import NavBar from "../../components/Navbar/navbar";
import "../globals.css";

const styles: { 
  container: CSSProperties; 
  logo: CSSProperties; 
  box: CSSProperties; 
  link: CSSProperties; 
  heading: CSSProperties; 
  paragraph: CSSProperties; 
} = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '80px',
    width: '100%',
    maxWidth: '1700px',
    margin: '0 auto',
    padding: '20px',
    color: '#0000ff',
    backgroundColor: '#FFFFF0',
  },

  logo: {
    width: '400px',
    height: '400px',
    objectFit: 'contain',  // This can remain as is
    marginBottom: '10px',
  },

  box: {
    backgroundColor: '#FFFFF0',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as 'column',  // Explicit type assertion
    justifyContent: 'space-between' as 'space-between',  // Explicit type assertion
    alignItems: 'center' as 'center',  // Explicit type assertion
    minHeight: '500px',  // Ensures all boxes have at least this height
  },

  link: {
    textDecoration: 'none',
    color: 'inherit',
  },

  heading: {
    marginBottom: '10px',
    fontSize: '1.5em',
  },

  paragraph: {
    color: '#555',
    fontSize: '1em',
  },
};

const Referrals: React.FC = () => {
  const [content, setContent] = useState([
    { 
      title: 'Ben Bhangu', 
      text: 'Buying a home can lead to more financial security, more equity and more pride in your living space. Ditch the rental and purchase your first home! Call me today to get started. Ben Bhangu The Home Loan Guru! NMLS 746773 ', 
      image: '/loanerlogo.png', 
      link: 'https://www.linkedin.com/in/benbhangu/' 
    },
    { title: 'Title 1', text: 'Details', image: '/refer.jpg' },
    { title: 'Title 2', text: 'Details', image: '/refer.jpg' },
    { title: 'Title 3', text: 'Details', image: '/refer.jpg' },
    { title: 'Title 4', text: 'Details', image: '/refer.jpg' },
    { title: 'Title 5', text: 'Details', image: '/refer.jpg' },
  ]);

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        {content.map((box, index) => (
          <a
            key={index}
            href={box.link}
            style={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div style={styles.box}>
              <img 
                src={box.image}
                alt={`${box.title} logo`}  // Corrected string interpolation
                style={styles.logo} 
              />
              <h2 style={styles.heading}>{box.title}</h2>
              <p style={styles.paragraph}>{box.text}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Referrals;
