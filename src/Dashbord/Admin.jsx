import React from "react";
import Navber from "../Components/Navber";
import { Outlet } from "react-router"; 
import AdminSidebar from "./AdminSidebar";
import { motion } from "framer-motion";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navber />
      <div className="flex">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-64 border-r bg-white shadow-md sticky top-0 h-screen"
        >
          <AdminSidebar />
        </motion.div>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
