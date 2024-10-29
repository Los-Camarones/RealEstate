"use client";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"; // Import custom hook to manage user authentication
import "../../globals.css"; // Import global styles
import NavBar from "@/components/Navbar/navbar"; // Import Navbar component for page header
import Sidebar from "@/components/Admin/Sidebar"; // Import Sidebar component for admin navigation
import { getTextContentBySection, updateTextContent } from "@/actions/ContentManagementActions"; // Import Supabase actions for fetching and updating content

// Define the ContentSection interface to represent data fetched from Supabase
interface ContentSection {
  id: number;
  section_text: string;
  heading_text: string;
  paragraph_text: string;
}

// 1. Set Up Authentication
// Define the ContentManagementPage component
const ContentManagementPage: React.FC = () => {
  const auth = useAuth(); // Check if the user is authenticated (boolean)
  const [contentSections, setContentSections] = useState<ContentSection[]>([]); // State to store content sections
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track errors

  // 2. Fetch Content from Supabase
  // useEffect to fetch content data on initial load if the user is authenticated
  useEffect(() => {
    if (!auth) return; // Only fetch data if user is authenticated

    // Async function to fetch content from Supabase
    const fetchContent = async () => {
      setLoading(true); // Set loading to true at start of fetch
      try {
        // Fetch "about_me" section data (example)
        const { data, error } = await getTextContentBySection("about_me");

        if (error) {
          setError("Failed to fetch content"); // Set error if fetch fails
          console.error("Fetch error:", error); // Log error for debugging
        } else {
          setContentSections(data || []); // Update state with fetched data or empty array if none
        }
      } catch (err) {
        console.error("Unexpected error:", err); // Log unexpected errors
        setError("Unexpected error occurred"); // Set generic error message
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchContent(); // Call fetchContent to start fetching
  }, [auth]); // Dependency array to re-run on auth state change

  // Handle form input changes and update contentSections state accordingly
  const handleInputChange = (id: number, field: string, value: string) => {
    setContentSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  // 3. Create a User-Friendly UI
  // Function to handle updating content in Supabase
  const handleUpdateContent = async (id: number) => {
    const section = contentSections.find((sec) => sec.id === id); // Find the content section by ID
    if (!section) return; // Exit if no matching section is found

    try {
      // Call updateTextContent action with updated heading and paragraph text
      const { error } = await updateTextContent(id, section.heading_text, section.paragraph_text);
      if (error) {
        console.error("Update error:", error); // Log error if update fails
        setError("Failed to update content"); // Set error message
      } else {
        alert("Content updated successfully"); // Show success message
      }
    } catch (err) {
      console.error("Unexpected error:", err); // Log unexpected errors
      setError("Unexpected error occurred"); // Set generic error message
    }
  };

  // UI: Render access denied message if user is not authenticated
  if (!auth) {
    return <p>Access denied. Admins only.</p>; // Render access denied message if not authenticated
  }

  return (
    <div className="flex-grow">
      <NavBar /> {/* Display NavBar at the top */}
      <div className="flex">
        <Sidebar /> {/* Display Sidebar for navigation */}
        <div className="p-6 flex-grow">
          <h1 className="text-2xl font-bold mb-4">Content Management</h1>

          {/* Display loading or error messages */}
          {loading ? (
            <p>Loading content...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            // Render editable form for each content section
            contentSections.map((section) => (
              <div key={section.id} className="mb-6">
                <h2 className="text-xl font-semibold">{section.section_text}</h2>
                {/* Input field for heading text */}
                <input
                  type="text"
                  value={section.heading_text}
                  onChange={(e) => handleInputChange(section.id, "heading_text", e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Edit heading"
                />
                {/* Text area for paragraph text */}
                <textarea
                  value={section.paragraph_text}
                  onChange={(e) => handleInputChange(section.id, "paragraph_text", e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Edit paragraph"
                />
                {/* Button to submit content updates */}
                <button
                  onClick={() => handleUpdateContent(section.id)}
                  className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
                >
                  Update Content
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;
