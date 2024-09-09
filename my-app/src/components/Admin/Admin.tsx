"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Sidebar component
const Sidebar = () => {
  const router = useRouter();
  
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Settings", path: "/settings" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-6">
              <a
                href={item.path}
                className="text-lg hover:bg-gray-700 rounded-lg px-3 py-2 block"
                onClick={() => router.push(item.path)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <button className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded" onClick={() => alert('Logging out...')}>
          Logout
        </button>
      </div>
    </div>
  );
};

// Main Admin Page Component
const AdminPage = () => {
  const [content, setContent] = useState("Welcome to the Admin Dashboard!");

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 p-10 bg-gray-100 h-screen">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Example content section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-600">{content}</p>
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
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
