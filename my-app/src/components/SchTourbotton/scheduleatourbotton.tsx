// ScheduleaTourBotton.tsx
import React, { useState } from 'react';
import ScheduleTour from '../ScheduleaTour/page'; // Adjust the path to your ScheduleTour component

const ScheduleaTourBotton = () => {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  const openModal = () => {
    setIsTourModalOpen(true);
  };

  const closeModal = () => {
    setIsTourModalOpen(false);
  };

  return (
    <div>
      <button 
        onClick={openModal} 
        className="fixed bottom-0 right-0 m-4 bg-amber-300 hover:bg-amber-400 text-black font-semibold py-2 px-4 border border-amber-500 rounded shadow"
      >
        Schedule a Tour
      </button>

      {/* Include the ScheduleTour component and pass the modal state */}
      {isTourModalOpen && <ScheduleTour isOpen={isTourModalOpen} onClose={closeModal} />}
    </div>
  );
}

export default ScheduleaTourBotton;
