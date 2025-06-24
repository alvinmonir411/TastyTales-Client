import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded transition font-medium ${
      isActive ? "bg-blue-500 text-white" : "text-gray-800 hover:bg-blue-200"
    }`;

  return (
    <div className="flex h-screen">
      {/* Toggle button for mobile */}
      <div className="md:hidden absolute top-10 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          ☰ Menu
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-100 p-6 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-8 text-blue-600">Admin Panel</h2>
        <nav className="space-y-4">
          <NavLink to="dashbord" className={navLinkStyle}>
            🏠 Home
          </NavLink>
          <NavLink to="totalRecipes" className={navLinkStyle}>
            📋 Total Recipes
          </NavLink>
          <NavLink to="totalUser" className={navLinkStyle}>
            👥 Total Users
          </NavLink>
          <NavLink to="/myrecipe" className={navLinkStyle}>
            🍳 My Recipe
          </NavLink>
          <NavLink to="Addpercel" className={navLinkStyle}>
            📦 Add Parcel
          </NavLink>
        </nav>
      </aside>

    
    </div>
  );
};

export default AdminSidebar;
