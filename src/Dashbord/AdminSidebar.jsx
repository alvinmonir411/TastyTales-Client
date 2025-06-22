import React from "react";
import { NavLink, Outlet } from "react-router";

const AdminSidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-8 text-blue-600">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="totalRecipes"
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-blue-300 hover:text-white transition ${
                isActive ? "bg-blue-500 text-white" : "text-gray-800"
              }`
            }
          >
            📦 Total Recipes
          </NavLink>
          <NavLink
            to="totalUser"
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-blue-300 hover:text-white transition ${
                isActive ? "bg-blue-500 text-white" : "text-gray-800"
              }`
            }
          >
            👤 Total Users
          </NavLink>
        </nav>
      </aside>

      
    </div>
  );
};

export default AdminSidebar;
