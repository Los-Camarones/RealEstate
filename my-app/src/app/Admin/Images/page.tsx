"use client";

import React, { useState, ChangeEvent } from "react";
import useAuth from "../../hooks/useAuth";
import "../../globals.css";
import NavBar from "@/components/Navbar/navbar";
import { uploadImageAndUpdateURL } from "@/actions/ImageManagementActions";
import "./collapsible.css"; // Import your collapsible CSS file

interface OpenSectionsState {
  home: boolean;
  aboutMe: boolean;
  getPrequalified: boolean;
  carousel: boolean;
  aboutMeHome: boolean;
  middlePictures: boolean;
  bottomPictures: boolean;
}

interface FileInputsState {
  [key: string]: File | undefined;
}

const Page: React.FC = () => {
  const auth = useAuth(); // Authentication hook

  // State to track which sections are open
  const [openSections, setOpenSections] = useState<OpenSectionsState>({
    home: false,
    aboutMe: false,
    getPrequalified: false,
    carousel: false,
    aboutMeHome: false,
    middlePictures: false,
    bottomPictures: false,
  });

  // State to track file inputs for each section
  const [fileInputs, setFileInputs] = useState<FileInputsState>({});

  // Toggle function for each main or sub-section
  const toggleSection = (section: keyof OpenSectionsState) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Handle file selection for each section and label
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, section: string, label: string) => {
    const file = e.target.files?.[0];
    console.log(`File selected for ${section}-${label}:`, file);
    setFileInputs((prevState) => ({
      ...prevState,
      [`${section}-${label}`]: file,
    }));
  };

  // Function to convert ArrayBuffer to base64 string
  function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // Function to handle uploading selected files for a section
  const handleSectionUpload = async (section: string, page: string, labels: string[]) => {
    for (const label of labels) {
      const fileKey = `${section}-${label}`;
      const file = fileInputs[fileKey];

      // Only upload if a file was selected for the label
      if (file) {
        console.log(`Starting upload for ${section}-${label} with file:`, file);

        try {
          const filePath = `${page}/${section}/${file.name}`;
          const arrayBuffer = await file.arrayBuffer(); // Convert file to ArrayBuffer
          const imageUrl = arrayBufferToBase64(arrayBuffer); // Convert ArrayBuffer to base64

          console.log(`File path: ${filePath}`);
          console.log(`Image URL (base64):`, imageUrl.slice(0, 100) + "..."); // Log first 100 chars for readability

          const response = await uploadImageAndUpdateURL(filePath, label, page, imageUrl);
          console.log(`Upload response for ${label}:`, response);

          if (response.success) {
            alert(`Image for ${label} uploaded successfully!`);
          } else {
            alert(`Failed to upload image: ${response.error}`);
          }
        } catch (error) {
          console.error("Upload error:", error);
          alert("An unexpected error occurred during upload.");
        }
      }
    }
  };

  if (!auth) {
    return <p>Access denied. Admins only.</p>;
  }

  // Helper function to render input for each image in a section, but only one upload button per section
  const renderImageUpload = (labels: string[], section: string, page: string) => (
    <div key={section}>
      {labels.map((label) => (
        <div className="mb-4" key={`${section}-${label}`}>
          <label className="block font-medium mb-1">{label}</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => handleFileChange(e, section, label)}
          />
        </div>
      ))}
      <button
        className="bg-blue-500 text-white py-1 px-4 rounded"
        onClick={() => handleSectionUpload(section, page, labels)}
      >
        Upload {section} Images
      </button>
    </div>
  );

  return (
    <div className="flex-grow">
      <NavBar />
      <div className="p-6">
        <h1 className="text-5xl font-bold mb-5">Image Management</h1>

        {/* Home Section */}
        <section className={`collapse-section ${openSections.home ? "active" : ""}`}>
          <div className="collapse-header" onClick={() => toggleSection("home")}>
            Home
          </div>
          <div className="collapse-content">

            {/* Carousel Sub-Section */}
            <section className={`collapse-section ${openSections.carousel ? "active" : ""}`}>
              <div className="collapse-header" onClick={() => toggleSection("carousel")}>
                Carousel Pictures
              </div>
              {openSections.carousel && (
                <div className="collapse-content">
                  {renderImageUpload(
                    Array.from({ length: 10 }, (_, i) => `Carousel Picture ${i + 1}`),
                    "Carousel",
                    "Home"
                  )}
                </div>
              )}
            </section>

            {/* About Me Sub-Section */}
            <section className={`collapse-section ${openSections.aboutMeHome ? "active" : ""}`}>
              <div className="collapse-header" onClick={() => toggleSection("aboutMeHome")}>
                About Me
              </div>
              {openSections.aboutMeHome && (
                <div className="collapse-content">
                  {renderImageUpload(["About Me"], "About Me Home", "Home")}
                </div>
              )}
            </section>

            {/* Middle Pictures Sub-Section */}
            <section className={`collapse-section ${openSections.middlePictures ? "active" : ""}`}>
              <div className="collapse-header" onClick={() => toggleSection("middlePictures")}>
                Middle Pictures
              </div>
              {openSections.middlePictures && (
                <div className="collapse-content">
                  {renderImageUpload(
                    Array.from({ length: 4 }, (_, i) => `Middle Pictures ${i + 1}`),
                    "Middle Pictures",
                    "Home"
                  )}
                </div>
              )}
            </section>

            {/* Bottom Pictures Sub-Section */}
            <section className={`collapse-section ${openSections.bottomPictures ? "active" : ""}`}>
              <div className="collapse-header" onClick={() => toggleSection("bottomPictures")}>
                Bottom Pictures
              </div>
              {openSections.bottomPictures && (
                <div className="collapse-content">
                  {renderImageUpload(["Sacramento Picture", "Yuba", "Elk Grove"], "Bottom Pictures", "Home")}
                </div>
              )}
            </section>
          </div>
        </section>

        {/* About Me Section */}
        <section className={`collapse-section ${openSections.aboutMe ? "active" : ""}`}>
          <div className="collapse-header" onClick={() => toggleSection("aboutMe")}>
            About Me
          </div>
          <div className="collapse-content">
            {renderImageUpload(["Lourdes", "Image 1", "Image 2", "Image 3"], "About Me", "About Me")}
          </div>
        </section>

        {/* Get Prequalified Section */}
        <section className={`collapse-section ${openSections.getPrequalified ? "active" : ""}`}>
          <div className="collapse-header" onClick={() => toggleSection("getPrequalified")}>
            Get Prequalified
          </div>
          <div className="collapse-content">
            {renderImageUpload(["Lourdes", "Background"], "Get Prequalified", "Get Prequalified")}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
