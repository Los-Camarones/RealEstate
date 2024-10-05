'use client';
import '../globals.css'; 
import React from 'react';
import NavBar from '../../components/Navbar/navbar';
import Sidebar from '../../components/Admin/Sidebar';
import LineChart from '@/components/Dashboard/LineChart/LineChart';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const AdminDashboard: React.FC = () => {
  const auth = useAuth();  // Check if the user is authenticated
  const router = useRouter();

  if (!auth) {
    // If the user is not authenticated, show a loading spinner or redirect
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 p-10 bg-gray-100 h-screen">
          <h2 className="text-4xl font-bold mb-8">Admin Dashboard</h2>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard, Lourdes!</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Users</h3>
              <p>Total Users: 100</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Reports</h3>
              <p>Active Reports: 25</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">System Health</h3>
              <p>Status: Healthy</p>
            </div>
            <div>
              <LineChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
