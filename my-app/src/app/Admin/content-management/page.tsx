"use client";

import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "../../globals.css";
import NavBar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Admin/Sidebar";
import {
  getTextContentBySection,
  updateTextContent,
  getContactInfo,
  updateContactInfo,
  getSocialLinks,
  updateSocialLinks,
  getAllAboutMeSections,
  updateAboutMeSection
} from "@/actions/ContentManagementActions";

// Define interfaces for ContentSection, ContactInfo, and SocialLinks
interface ContentSection {
  id: number;
  section_text: string;
  heading_text: string;
  paragraph_text: string;
}

interface ContactInfo {
  id: number;
  phone: string;
  email: string;
  address: string;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

const ContentManagementPage: React.FC = () => {
  const auth = useAuth();
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // State for managing collapsible sections
  const [aboutMeOpen, setAboutMeOpen] = useState(false);
  const [contactInfoOpen, setContactInfoOpen] = useState(false);
  const [socialLinksOpen, setSocialLinksOpen] = useState(false);

  // Fetch Content, Contact Info, and Social Links from Supabase
  useEffect(() => {
    if (!auth) return;

    const fetchAboutMeSections = async () => {
      try {
        const { data, error } = await getAllAboutMeSections();
        if (error) {
          setError("Failed to fetch About Me sections");
          console.error("Fetch error:", error);
        } else {
          setContentSections((data || []).sort((a, b) => {
            const aNum = parseInt(a.section_text.split("_").pop() || "0");
            const bNum = parseInt(b.section_text.split("_").pop() || "0");
            return aNum - bNum;
          }));
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchContactInfo = async () => {
      try {
        const { data, error } = await getContactInfo();
        console.log("Supabase contact info data:", data);

        if (error) {
          setError("Failed to fetch contact info");
          console.error("Contact info fetch error:", error);
        } else if (data && data.length > 0) {
          setContactInfo(data[0]);
        } else {
          setError("No contact info available");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Unexpected error occurred");
      }
    };

    const fetchSocialLinks = async () => {
      try {
        const { data, error } = await getSocialLinks();
        if (error) {
          setError("Failed to fetch social media links");
          console.error("Social links fetch error:", error);
        } else {
          setSocialLinks(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Unexpected error occurred");
      }
    };

    fetchAboutMeSections();
    fetchContactInfo();
    fetchSocialLinks();
  }, [auth]);

  // Handle input changes for content sections
  const handleContentInputChange = (id: number, field: string, value: string) => {
    setContentSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  // Handle input changes for contact info
  const handleContactInfoChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo((prevInfo) => {
      if (!prevInfo) return prevInfo;
      return {
        ...prevInfo,
        [field]: value,
      };
    });
  };

  // Handle input changes for social links
  const handleSocialLinkChange = (id: number, url: string) => {
    setSocialLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, url } : link
      )
    );
  };

  // Handle content updates
  const handleUpdateContent = async () => {
    try {
      for (const section of contentSections) {
        const { error } = await updateTextContent(section.id, section.heading_text, section.paragraph_text);
        if (error) {
          console.error("Update error:", error);
          setError("Failed to update content");
          return;
        }
      }
      setSuccessMessage("About Me sections updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred");
    }
  };

  // Handle contact info updates
  const handleUpdateContactInfo = async () => {
    if (!contactInfo) return;

    try {
      const { error } = await updateContactInfo(contactInfo.id, contactInfo.phone, contactInfo.email, contactInfo.address);
      if (error) {
        console.error("Contact update error:", error);
        setError("Failed to update contact info");
      } else {
        setSuccessMessage("Contact info updated successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred");
    }
  };

  // Handle social links updates
  const handleUpdateSocialLinks = async () => {
    try {
      for (const link of socialLinks) {
        const { error } = await updateSocialLinks(link.id, link.url);
        if (error) {
          console.error(`Update error for ${link.platform}:`, error);
          setError(`Failed to update ${link.platform} link`);
          return;
        }
      }
      setSuccessMessage("Social media links updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred");
    }
  };

  if (!auth) {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="flex-grow">
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="p-6 flex-grow">
          <h1 className="text-5xl font-bold mb-5">Content Management</h1>

          {/* Display loading, error, or success messages */}
          {loading && <p>Loading content...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          {/* Update About Me Info Section */}
          <h2 className="text-2xl font-bold mb-4 cursor-pointer" onClick={() => setAboutMeOpen(!aboutMeOpen)}>
            Update About Me Info {aboutMeOpen ? "−" : "+"}
          </h2>
          {aboutMeOpen && (
  <div>
    {/* Render Bio section first if it exists */}
    {contentSections
      .filter((section) => section.section_text === "Bio")
      .map((bioSection) => (
        <div key={bioSection.id} className="mb-6">
          <h3 className="text-xl font-semibold">Bio</h3>
          <label className="block mb-1 font-medium">Heading</label>
          <input
            type="text"
            value={bioSection.heading_text}
            onChange={(e) => handleContentInputChange(bioSection.id, "heading_text", e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Edit heading"
          />
          <label className="block mb-1 font-medium">Paragraph</label>
          <textarea
            value={bioSection.paragraph_text}
            onChange={(e) => handleContentInputChange(bioSection.id, "paragraph_text", e.target.value)}
            className="w-full p-2 border rounded mb-2 h-32"
            placeholder="Edit paragraph"
          />
        </div>
      ))}

    {/* Render other sections below */}
    {contentSections
      .filter((section) => section.section_text !== "Bio")
      .map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="text-xl font-semibold">
            {section.section_text.replace("about_me_section_", "Section ")}
          </h3>
          <label className="block mb-1 font-medium">Heading</label>
          <input
            type="text"
            value={section.heading_text}
            onChange={(e) => handleContentInputChange(section.id, "heading_text", e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Edit heading"
          />
          <label className="block mb-1 font-medium">Paragraph</label>
          <textarea
            value={section.paragraph_text}
            onChange={(e) => handleContentInputChange(section.id, "paragraph_text", e.target.value)}
            className="w-full p-2 border rounded mb-2 h-32"
            placeholder="Edit paragraph"
          />
        </div>
      ))}

    <button onClick={handleUpdateContent} className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700">
      Update About Me Section
    </button>
  </div>
)}

          {/* Update Contact Info Section */}
          <h2 className="text-2xl font-bold mb-4 cursor-pointer" onClick={() => setContactInfoOpen(!contactInfoOpen)}>
            Update Contact Info {contactInfoOpen ? "−" : "+"}
          </h2>
          {contactInfoOpen && contactInfo && (
            <div className="mb-6">
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) => handleContactInfoChange("phone", e.target.value)}
                className="w-full p-2 border rounded mb-4"
                placeholder="Edit phone number"
              />
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleContactInfoChange("email", e.target.value)}
                className="w-full p-2 border rounded mb-4"
                placeholder="Edit email address"
              />
              <label className="block mb-1 font-medium">Address</label>
              <textarea
                value={contactInfo.address}
                onChange={(e) => handleContactInfoChange("address", e.target.value)}
                className="w-full p-2 border rounded mb-4 h-32"
                placeholder="Edit address"
              />
              <button onClick={handleUpdateContactInfo} className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700">
                Update Contact Info
              </button>
            </div>
          )}

          {/* Update Social Media Links Section */}
          <h2 className="text-2xl font-bold mb-4 cursor-pointer" onClick={() => setSocialLinksOpen(!socialLinksOpen)}>
            Update Social Media Links {socialLinksOpen ? "−" : "+"}
          </h2>
          {socialLinksOpen && (
            <div className="mb-6">
              {socialLinks.map((link) => (
                <div key={link.id} className="mb-4">
                  <label className="block mb-1 font-medium">{link.platform}</label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(link.id, e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    placeholder={`Update ${link.platform} URL`}
                  />
                </div>
              ))}
              <button onClick={handleUpdateSocialLinks} className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700">
                Update Social Media Links
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;
