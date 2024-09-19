// components/Admin/Sidebar.tsx
import React from "react";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Reports", path: "/admin/reports" },
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

export default Sidebar;
