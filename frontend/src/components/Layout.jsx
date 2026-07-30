import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100">

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-4 z-40">

        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl"
        >
          ☰
        </button>

        <h1 className="font-bold text-lg">
          Food Admin
        </h1>

      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 h-screen overflow-y-auto pt-16 lg:pt-0">

        <div className="p-6">
          <Outlet />
        </div>

      </main>

    </div>
  );
}