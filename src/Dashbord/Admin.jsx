import React from 'react'
import Navber from '../Components/Navber'
import { Outlet } from 'react-router'
import AdminSidebar from './AdminSidebar'
import { motion } from 'framer-motion';

const Admin = () => {
  return (
    <div>
      <Navber />
      <div className="flex max-w-[100px]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="border-r-2 max-h-full sticky top-0"
        >
          <AdminSidebar />
        </motion.div>
        <div className="m-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Admin