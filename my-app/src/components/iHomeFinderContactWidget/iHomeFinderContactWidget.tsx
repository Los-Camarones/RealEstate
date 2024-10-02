"use client";
import React, { useEffect, useRef } from "react";
import styles from './Contact.module.css'
const IHomeFinderContactWidget = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the Gallery Slider widget script
    const addScript = () => {
      if (pageRef.current && !pageRef.current.querySelector("script")) {
        const script = document.createElement("script");
        script.innerHTML = `
            document.currentScript.replaceWith(ihfKestrel.render({
		    "component": "contactFormWidget"
	}));
        `;
        pageRef.current.appendChild(script);
      }
    };

    // Add the script on component mount
    addScript();

    // Cleanup function to remove the script on component unmount
    return () => {
      if (pageRef.current) {
        pageRef.current.innerHTML = ""; // Clear all children including the script
      }
    };
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <h1>Send me a message!</h1>
      </header>
      <div id="iHomeFinderContactWidget">
        {/* The widget will be rendered inside this div */}
        <div ref={pageRef} />
      </div>
    </div>
  );
};

export default IHomeFinderContactWidget;
