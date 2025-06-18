import React from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa6";
import { GoStopwatch } from "react-icons/go";
import { MdOutlineAccountTree } from "react-icons/md";
import { AiOutlineGroup } from "react-icons/ai";
import CountUp from "react-countup";

const Contebuters = () => {
  return (
    <div className="md:mt-16 md:mb -10">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -460 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-6xl font-extrabold mb-16 text-gray-800"
        >
          Solution In Easy Steps for a Successful Life
        </motion.h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:mt-12 container mx-auto">
        {/* 1st Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-5 shadow-xl p-8 rounded-xl bg-white hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <FaUsers size={60} className="text-[#cfac2d]" />
          <span className="text-4xl font-extrabold text-black">
            {" "}
            <CountUp end={3.5} duration={10} />k
          </span>
          <p className="text-xl font-semibold text-gray-600">Happy Customers</p>
        </motion.div>

        {/* 2nd Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-5 shadow-xl p-8 rounded-xl bg-white hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <GoStopwatch size={60} className="text-[#cfac2d]" />
          <span className="text-4xl font-extrabold text-black">
            {" "}
            <CountUp end={332} duration={10} />k
          </span>
          <p className="text-xl font-semibold text-gray-600">Working Hours</p>
        </motion.div>

        {/* 3rd Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-5 shadow-xl p-8 rounded-xl bg-white hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <MdOutlineAccountTree size={60} className="text-[#cfac2d]" />
          <span className="text-4xl font-extrabold text-black">
            <CountUp end={100} duration={5}></CountUp>
          </span>
          <p className="text-xl font-semibold text-gray-600">
            Professional Courses
          </p>
        </motion.div>

        {/* 4th Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-5 shadow-xl p-8 rounded-xl bg-white hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <AiOutlineGroup size={60} className="text-[#cfac2d]" />
          <span className="text-4xl font-extrabold text-black">
            <CountUp end={100} duration={10} />%
          </span>
          <p className="text-xl font-semibold text-gray-600">Results</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contebuters;
