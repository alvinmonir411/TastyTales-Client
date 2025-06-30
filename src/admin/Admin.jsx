import React from "react";

import { Outlet } from "react-router";
import { BiMenu } from "react-icons/bi";
import AdminSidebar from "./AdminSidebar";

const Admin = () => {
  return (
    <div className="relative">
      <div className="drawer lg:drawer-open w-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  items-center justify-center overflow-hidden">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden absolute top-0 left-0"
          >
            <BiMenu />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <AdminSidebar />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
