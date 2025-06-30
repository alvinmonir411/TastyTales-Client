import React, { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "./../Auth/AuthProvider";
import useUserRole from "./../Hooks/useUserRole";

const AdminSidebar = () => {
  const { user } = use(AuthContext);
  const { role } = useUserRole(user?.email);
  console.log(role);
  return (
    <aside className="w-64 bg-base-200 text-base-content overflow-y-hidden-hidden  p-5 ">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
      <ul className="menu space-y-1">
        {role === "admin" && (
          <>
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
            </li>{" "}
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
                to="makeAdmin"
              >
                📦 Make Admin
              </NavLink>
            </li>{" "}
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
                to="pendingRiders"
              >
                📦 Pending Riders
              </NavLink>
            </li>
          </>
        )}
        {/* for user */}

        {role === "user" && (
          <>
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
                to="Addpercel"
              >
                📦 Add Parcel
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
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
                to="myrecipes"
              >
                🍳 My Recipe
              </NavLink>
            </li>
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
                to="beARider"
              >
                📦 Be A Rider
              </NavLink>
            </li>
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
          </>
        )}
        {/* {for seler} */}
        {role === "seller" && <> </>}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
