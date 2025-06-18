import React from 'react'
import { motion } from 'framer-motion';

const Book = () => {
  return (
    <div className="flex justify-center items-center gap-10 mt-10 container mx-auto capitalize">
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col  gap-4"
      >
        <p className="text-xl font-semibold">my book</p>
        <h1 className="text-4xl font-bold">How to Cook Healthy</h1>
        <p>
          Sample text. Click to select the Text Element. Ut enim ad minim <br />
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex{" "}
          <br />
          ea commodo consequat. Duis aute irure dolor in reprehenderit in <br />
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. <br />
        </p>
        <button className="rounded-tl-[50px] rounded-br-[50px] bg-[#ffc107] text-[#1a1f1e] capitalize text-2xl font-semibold px-20 py-6 mt-10 flex items-center gap-2 transition-all">
          view recipe
        </button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 360 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src="/Book.png" alt="" />
      </motion.div>
    </div>
  );
}

export default Book
