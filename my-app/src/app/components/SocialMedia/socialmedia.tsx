import React from 'react';
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa';
import './styles/socialmedialink.css';


const SocialMediaLinks = () => (
    <div className="fixed right-2 top-1/2 transform -translate-y-1/2 space-y-10 z-50">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="shake-on-hover">
        <FaFacebook size={32} />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="shake-on-hover">
        <FaTwitter size={32} />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="shake-on-hover">
        <FaInstagram size={32} />
      </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="shake-on-hover">
            <FaYoutube size={32} />
        </a>
    </div>
  );
  
  export default SocialMediaLinks;