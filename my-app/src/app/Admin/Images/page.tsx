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
    if (file) {
      setFileInputs((prevState) => ({
        ...prevState,
        [`${section}-${label}`]: file,
      }));
    }
  };

  // Function to handle the upload
  const handleUpload = async (section: string, page: string, label: string) => {
    const fileKey = `${section}-${label}`;
    const file = fileInputs[fileKey];

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      const response = await uploadImageAndUpdateURL(file, label, page);
      if (response.success) {
        alert(`Image for ${label} uploaded successfully!`);
      } else {
        alert(`Failed to upload image: ${response.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An unexpected error occurred during upload.");
    }
  };

  if (!auth) {
    return <p>Access denied. Admins only.</p>;
  }

  // Helper function to render input and upload button for each image section
  const renderImageUpload = (label: string, section: string, page: string) => (
    <div className="mb-4" key={`${section}-${label}`}>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="file"
        accept="image/*"
        className="w-full p-2 border rounded mb-2"
        onChange={(e) => handleFileChange(e, section, label)}
      />
      <button
        className="bg-blue-500 text-white py-1 px-4 rounded"
        onClick={() => handleUpload(section, page, label)}
      >
        Upload {label}
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
                  {Array.from({ length: 10 }, (_, i) =>
                    renderImageUpload(`Carousel Picture ${i + 1}`, "home", "Home")
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
                  {renderImageUpload("About Me", "home", "Home")}
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
                  {Array.from({ length: 4 }, (_, i) =>
                    renderImageUpload(`Middle Pictures ${i + 1}`, "home", "Home")
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
                  {renderImageUpload("Sacramento Picture", "home", "Home")}
                  {renderImageUpload("Yuba", "home", "Home")}
                  {renderImageUpload("Elk Grove", "home", "Home")}
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
            {renderImageUpload("Lourdes", "aboutMe", "About Me")}
            {renderImageUpload("Image 1", "aboutMe", "About Me")}
            {renderImageUpload("Image 2", "aboutMe", "About Me")}
            {renderImageUpload("Image 3", "aboutMe", "About Me")}
          </div>
        </section>

        {/* Get Prequalified Section */}
        <section className={`collapse-section ${openSections.getPrequalified ? "active" : ""}`}>
          <div className="collapse-header" onClick={() => toggleSection("getPrequalified")}>
            Get Prequalified
          </div>
          <div className="collapse-content">
            {renderImageUpload("Lourdes", "getPrequalified", "Get Prequalified")}
            {renderImageUpload("Background", "getPrequalified", "Get Prequalified")}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
