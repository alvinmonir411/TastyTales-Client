import React from "react";
import { motion } from "framer-motion";

const Works = () => {
  return (
    <div className="  bg-[#cfac2d] w-full md:flex items-center justify-center">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full py-10 px-4 md:px-0 max-w-screen-xl">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -460 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white md:mr-[-150px] z-10 px-4 sm:px-6 md:px-10 py-10 md:py-14 rounded-tr-[50px] md:rounded-tr-[100px] rounded-bl-[50px] md:rounded-bl-[100px] w-full max-w-[650px] mb-6 md:mb-0"
        >
          <h1 className="text-2xl sm:text-3xl  font-extrabold text-black leading-tight mb-5">
            90 Day Body & Mind <br />
            Transformation Program
          </h1>
          <p className="text-[#333] text-sm sm:text-base md:text-lg mb-8">
            Sample text. Click to select the Text Element.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#cfac2d] text-white font-bold text-sm px-8 py-4 
                       rounded-tl-[50px] rounded-br-[50px] transition-all"
          >
            HOW IT WORKS →
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 360 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-[500px] flex justify-center overflow-hidden mb-6 md:mb-0"
        >
          <img
            src="/Howworkd.png"
            alt="How It Works"
            className="w-full max-h-[250px] sm:max-h-[300px] md:max-h-[600px] object-contain px-4"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Works;
