import React from "react";
import { SidebarProvider } from "../context/SidebarContext";
import Sidebar from "../../components/Admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
