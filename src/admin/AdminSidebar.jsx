import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import useUserRole from "../Hooks/useUserRole";

const AdminSidebar = () => {
  const { user } = useContext(AuthContext);
  const { role } = useUserRole(user?.email);

  return (
    <aside className="w-64 bg-base-200 text-base-content p-5">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 capitalize">
        {role} Panel
      </h2>
      <ul className="menu space-y-1">
        {/* Common Home link */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 underline" : ""
            }
          >
            🏠 Home
          </NavLink>
        </li>

        {/* Admin Routes */}
        {role === "admin" && (
          <>
            <li>
              <NavLink
                to="dashbord"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                📊 Dashboard Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="makeAdmin"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                👑 Make Admin
              </NavLink>
            </li>
            <li>
              <NavLink
                to="orderTable"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                📋 Order Table
              </NavLink>
            </li>
            <li>
              <NavLink
                to="AllParcel"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                📦 All Parcel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="totalRecipes"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                🍽 Total Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="pendingRiders"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                🕒 Pending Riders
              </NavLink>
            </li>
          </>
        )}

        {/* User Routes */}
        {role === "user" && (
          <>
            <li>
              <NavLink
                to="Addpercel"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                ➕ Add Parcel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="myorder"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                📦 My Order
              </NavLink>
            </li>
            <li>
              <NavLink
                to="myrecipes"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                🍳 My Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="myparcle"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                📦 My Parcel
              </NavLink>
            </li>
          </>
        )}

        {/* Rider Routes (show only if role is "rider") */}
        {role === "rider" && (
          <>
            <li>
              <NavLink
                to="beARider"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                🛵 Be a Rider
              </NavLink>
            </li>
            <li>
              <NavLink
                to="riderOrdersTable"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
              >
                📦 My Deliveries
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
