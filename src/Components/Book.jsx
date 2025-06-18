import React from "react";
import { motion } from "framer-motion";

const Book = () => {
  return (
    <div className="hidden md:flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:mt-10 px-4 md:px-0 container mx-auto capitalize">
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col gap-4 w-full md:w-auto text-center md:text-left"
      >
        <p className="text-xl font-semibold">my book</p>
        <h1 className="text-4xl font-bold">How to Cook Healthy</h1>
        <p>
          Sample text. Click to select the Text Element. Ut enim ad minim{" "}
          <br className="hidden md:block" />
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex{" "}
          <br className="hidden md:block" />
          ea commodo consequat. Duis aute irure dolor in reprehenderit in{" "}
          <br className="hidden md:block" />
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.{" "}
          <br className="hidden md:block" />
        </p>
        <button className="rounded-tl-[50px] rounded-br-[50px] bg-[#ffc107] text-[#1a1f1e] capitalize text-2xl font-semibold px-20 py-6 mt-10 flex items-center gap-2 transition-all mx-auto md:mx-0">
          view recipe
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 360 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-auto flex justify-center"
      >
        <img
          src="/Book.png"
          alt=""
          className="max-w-full h-auto object-contain"
        />
      </motion.div>
    </div>
  );
};

export default Book;
