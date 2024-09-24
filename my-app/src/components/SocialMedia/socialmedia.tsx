import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const SocialMediaLinks = () => (
  <div className="fixed left-2 top-1/2 transform -translate-y-1/2 space-y-2 z-50">
    <div className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all">
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-red-500" size={32} />
      </a>
    </div>
    <div className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="text-blue-600" size={32} />
      </a>
    </div>
    <div className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all">
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter className="text-blue-400" size={32} />
      </a>
    </div>
    <div className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all">
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="text-blue-700" size={32} />
      </a>
    </div>
  </div>
);

export default SocialMediaLinks;
