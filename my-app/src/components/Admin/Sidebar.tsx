'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaHome, FaUsers, FaCog, FaClipboardList, FaChartLine, FaCommentDots, FaBuilding, FaTasks } from 'react-icons/fa';
import { MdSupervisorAccount } from 'react-icons/md';
import { useSidebarContext } from "../../app/context/SidebarContext";
import useAuth from "../../app/hooks/useAuth"; // Import your existing auth hook

const Sidebar: React.FC = () => {
  const router = useRouter();
  const auth = useAuth(); // Get authentication status

  const { openDropdown, toggleDropdown } = useSidebarContext();

  const menuCategories = [
    {
      category: "Dashboard",
      icon: <FaHome />,
      items: [{ name: "Dashboard", path: "/Admin/dashboard" }],
    },
    {
      category: "Leads/Subscribers",
      icon: <FaUsers />,
      items: [{ name: "Leads List", path: "/Admin/lead-list" }],
    },
    {
      category: "Client Interactions",
      icon: <FaClipboardList />,
      items: [
        { name: "Contact Requests", path: "/Admin/contact-requests" },
        { name: "Request Showing", path: "/Admin/scheduleShowingRequests" },
        { name: "Valuation Requests", path: "/Admin/valuation-requests" },
        { name: "More Info Requests", path: "/Admin/more-info-requests"},
        {name: "Market Sign up Request", path :"/Admin/marketReportSignupRequest" }
      ],
    },
    {
      category: "Properties",
      icon: <FaBuilding />,
      items: [
        { name: "Property Listings", path: "/Admin/property-listings" },
        { name: "Property Details", path: "/Admin/property-details" },
      ],
    },
    {
      category: "Reports",
      icon: <FaChartLine />,
      items: [
        { name: "Listing Report Signup Requests", path: "/Admin/listing-report-signup-requests" },
        { name: "Market Trends", path: "/Admin/Market" },
      ],
    },
    {
      category: "Content Management",
      icon: <FaTasks />,
      items: [
        { name: "Testimonials", path: "/Admin/testimonials" },
        { name: "Home Page Content Management", path: "/Admin/content-management" }
      ],
    },
    {
      category: "Settings",
      icon: <FaCog />,
      items: [{ name: "Settings", path: "/Admin/settings" }],
    },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      router.push("/Sign-in");
    } catch (err) {
      console.error("Error during logout", err);
    }
  };

  // Render loading indicator if auth check is still pending
  if (!auth) {
    return null;
  }

  return (
    <div className="navbar-container" style={{ /* styling */ }}>
      <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
      <ul>
        {menuCategories.map((category) => (
          <li key={category.category} className="mb-4">
            <button
              onClick={() => toggleDropdown(category.category)}
              className="flex items-center text-lg font-semibold w-full text-left hover:bg-gray-300 rounded-lg px-3 py-2"
            >
              <span className="mr-2">{category.icon}</span>
              {category.category}
            </button>
            {openDropdown === category.category && (
              <ul className="pl-6">
                {category.items.map((item) => (
                  <li key={item.name} className="mb-2">
                    <a
                      onClick={() => router.push(item.path)}
                      className="text-base hover:bg-gray-200 rounded-lg px-3 py-1 block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <button className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
