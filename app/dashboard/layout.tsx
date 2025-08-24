"use client"; // Agar client bo‘lsa qoldiring

import DashboardComp from "@/components/DashboardComp";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen">
      {/* Sidebar for large screens */}
      <div className="hidden md:block w-[20%] border-r border-gray-300">
        <DashboardComp />
      </div>

      {/* Main content */}
      <div className="flex-1 relative">
        {/* Top bar with menu button on mobile */}
        <div className="md:hidden p-2 border-b flex justify-between items-center">
          <button
            className="p-2 bg-gray-200 rounded"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        {children}

        {/* Modal Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex">
            <div className="w-64 bg-white h-full p-4 shadow-lg">
              <button
                className="mb-4 text-right w-full"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
              <DashboardComp />
            </div>
            <div
              className="flex-1"
              onClick={() => setSidebarOpen(false)}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
