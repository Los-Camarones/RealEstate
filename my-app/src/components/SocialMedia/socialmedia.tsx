import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SocialMediaLinks = () => (
  <div className="fixed left-2 top-1/2 transform -translate-y-1/2 space-y-2 z-50">
    <div className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all">
      <a href="https://www.instagram.com/lourdesmendoza1/" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-red-500" size={32} />
      </a>
    </div>
    <div className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all">
      <a href="https://www.facebook.com/lourdesmendoza0" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="text-blue-600" size={32} />
      </a>
    </div>
    <div className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all">
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="text-blue-700" size={32} />
      </a>
    </div>
    <div className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all">
      <a href="https://www.youtube.com/@LourdesMendozaTV" target="_blank" rel="noopener noreferrer">
      <FaYoutube className="text-red-500" size={32} />
      </a>
    </div>
    <div className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all">
      <a href="https://x.com/lourdesmendoza?fbclid=IwY2xjawFEDC1leHRuA2FlbQIxMAABHRLf2lKnpkI1M7JiS8MpIyiKXiev2vg4wWdeL-TAvgxtvVC5LPg9Ry-x6A_aem_ailAeZPj9DvY9P7x6D-L8w" target="_blank" rel="noopener noreferrer">
        <FaXTwitter className="text-black-400" size={32} />
      </a>
    </div>
  </div>
);

export default SocialMediaLinks;
