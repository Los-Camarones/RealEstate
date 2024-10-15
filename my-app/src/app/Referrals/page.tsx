
'use client';

import React, {useState} from 'react';
import NavBar from "../../components/Navbar/navbar";
import "../globals.css";


const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '80px',
    width: '100%',
    maxWidth: '1700px',
    margin: '0 auto', 
    padding: '20px',
    color: '#0000ff',
    backgroundColor: '#FFFFF0'
    

  },
  
  logo: {
    width: '400px',
    height: '400px',
    objectFit:'contain',
    marginBottom: '10px',
  },

  box: {
    backgroundColor: '#FFFFF0',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    textAlign: 'center' as 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3 ease',
    cursor:'pointer',

  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },

  hover: {
    marginBottom: '10px',
    fontSize: '1.5em',
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
    { title : 'Ben Bhangu', text: 'Buying a home can lead to more financial security, more equity and more pride in your living space. Ditch the rental and purchase your first home! Call me today to get started. Ben Bhangu The Home Loan Guru! NMLS 746773 ', image: '/loanerlogo.png', link:'https://www.linkedin.com/in/benbhangu/' },
    { title : 'title 1', text: 'details', image: '/temp1.jpg'},
    { title : 'title 1', text: 'details', image: '/temp2.jpg'},
    { title : 'title 1', text: 'details', image: '/temp3.jpg'},
    { title : 'title 1', text: 'details', image: '/temp4.jpg'},
    { title : 'title 1', text: 'details', image: '/temp5.jpg'},

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
           alt={'${box.title} logo'} 
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


