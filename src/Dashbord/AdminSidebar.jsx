import React, { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";

const AdminSidebar = () => {
  const {user}= use(AuthContext)
  return (
    <aside className="w-64 bg-base-200 text-base-content overflow-y-hidden-hidden  p-5 ">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
      <ul className="menu space-y-1">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 underline" : ""
            }
            to="/"
          >
            🏠 Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 underline" : ""
            }
            to="dashbord"
          >
            🏠 Dashbord Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 underline" : ""
            }
            to="totalRecipes"
          >
            📋 Total Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 underline" : ""
            }
            to="totalUser"
          >
            👥 Total Users
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 underline" : ""
            }
            to="/myrecipe"
          >
            🍳 My Recipe
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 underline" : ""
            }
            to="Addpercel"
          >
            📦 Add Parcel
          </NavLink>
        </li>
        {user?.email === "alvinmonir411@gmail.com" && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500 underline" : ""
              }
              to="AllParcel"
            >
              📦 All Parcel
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 underline" : ""
            }
            to="myparcle"
          >
            📦 My Parcle
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 underline" : ""
            }
            to="myorder"
          >
            📦 My Order
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
