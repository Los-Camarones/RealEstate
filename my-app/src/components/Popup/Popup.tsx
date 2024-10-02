// components/Popup.tsx (note the .tsx extension for TypeScript)
import React from 'react';

interface PopupProps {
  show: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-black"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-xl font-semibold">Welcome to Our Pop up!</h2>
        <p>This is a sample pop-up message for demonstration purposes.</p>
      </div>
    </div>
  );
};

export default Popup;
