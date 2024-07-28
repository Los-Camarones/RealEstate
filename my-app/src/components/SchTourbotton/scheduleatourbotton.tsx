// Code: ScheduleaTourbotton.tsx
import React, { useState } from 'react';
import Link from 'next/link';

const ScheduleaTourBotton = () => {
  return (
    <div>
      <Link href="/ScheduleaTour">
        <button className="fixed bottom-0 right-0 m-4 bg-amber-300 hover:bg-amber-400 text-black font-semibold py-2 px-4 border border-amber-500 rounded shadow">
          Schedule a Tour
        </button>
      </Link>
    </div>
  );
}
  export default ScheduleaTourBotton;

  