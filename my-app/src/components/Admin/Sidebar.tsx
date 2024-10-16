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
    { name: "Request Showing", path: "/Admin/scheduleShowingRequests" },
    {name:"Leads List", path:"/Admin/lead-list"},  
    {name: "Property Listings", path: "/Admin/property-listings"},
<<<<<<< HEAD
    {name: "Contact Requests", path: "/Admin/contact-requests"},
    {name: "Property Details", path: "/Admin/property-details"},
    {name: "Valuation requests", path: "/Admin/valuation-requests"},
=======
<<<<<<< HEAD
    {name: "Property Details", path: "/Admin/property-details"}
=======
    {name: "Market Trends", path : "/Admin/Market"}
>>>>>>> 9fc89ec (finished dp 225 and two child issues of DP 161)
>>>>>>> 0d6952c (finished dp 225 and two child issues of DP 161)
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
<div className="navbar-container" style={{ background: 'linear-gradient(to bottom, rgb(189, 238, 253), rgb(120, 184, 249), rgb(51, 130, 228))', opacity: 0.9, backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1rem' }}>
  {/* Navbar content */}



<div>
        <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-6">
              <a
                href={item.path}
                className="text-lg hover:bg-gray-200 rounded-lg px-3 py-2 block"

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
