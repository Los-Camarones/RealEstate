/*
    This component is responsible for rendering the sidebar of the admin panel.
    It contains a list of menu items that the user can click to navigate to different pages.
    The sidebar also contains a logout button that will log the user out of the application.
*/
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Sidebar: React.FC = () => {
  const router = useRouter();

  const menuItems = [
    // Pages need to be created for these paths
    // The paths are just placeholders for now
    // The paths should be updated to the actual paths of the pages
    // that will be created for the admin panel
    { name: "Dashboard", path: "/Admin/dashboard" },
    { name: "Users", path: "/Admin/users" },
    { name: "Settings", path: "/Admin/settings" },
    { name: "Reports", path: "/Admin/reports" },
    {name:"Leads List", path:"/Admin/lead-list"},  
    {name: "Property Listings", path: "/Admin/property-listings"},
    {name: "Testimonials" , path: "/Admin/testimonials"}
  ];

  // The Logout button call the /api/logout endpoint
  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');  // Clear the HTTP-only cookie on logout
      router.push('/Sign-in');  // Redirect to the sign-in page after logout
    } catch (err) {
      console.error("Error during logout", err);
    }
  };

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
        <button
          className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
          onClick={handleLogout}  // Logout button to call API logout functionality
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
