import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SocialLink {
  platform: string;
  url: string;
}

const SocialMediaLinks: React.FC = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data, error } = await supabase.from('media_links').select('platform, url');
      if (!error && data) {
        setLinks(data);
      } else {
        console.error("Error fetching social links:", error?.message);
      }
    };
    fetchLinks();
  }, []);

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <FaInstagram className="text-red-500" size={32} />;
      case 'Facebook': return <FaFacebook className="text-blue-600" size={32} />;
      case 'LinkedIn': return <FaLinkedin className="text-blue-700" size={32} />;
      case 'YouTube': return <FaYoutube className="text-red-500" size={32} />;
      case 'X (Twitter)':
        return <img src="/X.png" alt="X Logo" style={{ width: 32, height: 32 }} />; // Custom X logo image
      default: return null;
    }
  };

  return (
    <div className="fixed left-2 top-1/2 transform -translate-y-1/2 space-y-2 z-50">
      {links.map(({ platform, url }) => (
        <div key={platform} className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {getIcon(platform)}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
