import React from "react";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";

const HowWorks = () => {
  return (
    <div className="bg-[#1a1a1ac9] py-20 px-6 md:px-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        
          className="flex-1"
        >
          <img
            src="/Works.jpg"
            alt="How It Works"
            className="rounded-tr-[80px] rounded-bl-[80px] w-full max-w-[500px] mx-auto"
          />
        </motion.div>

        {/* Text Section */}
        <div className="flex-1 text-white space-y-10">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold leading-tight text-[#cfac2d]"
          >
            How It Works
          </motion.h2>

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#2a2a2a] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-[#cfac2d] mb-2">
              Step 1: What will I eat?
            </h3>
            <p className="text-gray-300 mb-3">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p className="flex items-center gap-2 text-[#cfac2d] font-medium cursor-pointer hover:underline">
              See Our Range of Meals <FaArrowRightLong />
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#2a2a2a] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-[#cfac2d] mb-2">
              Step 2: Workout Plans
            </h3>
            <p className="text-gray-300 mb-3">
              We build personalized fitness routines to match your goals.
            </p>
            <p className="flex items-center gap-2 text-[#cfac2d] font-medium cursor-pointer hover:underline">
              View Programs <FaArrowRightLong />
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#2a2a2a] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-[#cfac2d] mb-2">
              Step 3: Stay Consistent
            </h3>
            <p className="text-gray-300 mb-3">
              Daily motivation, tracking tools, and a support community.
            </p>
            <p className="flex items-center gap-2 text-[#cfac2d] font-medium cursor-pointer hover:underline">
              Join Now <FaArrowRightLong />
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
