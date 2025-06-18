import React from "react";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <div className="container mx-auto my-28 px-5 flex flex-col lg:flex-row justify-center items-center gap-10">
      {/* Image Section with premium animation */}
      <motion.div
        initial={{ rotate: 180, scale: 0.5, opacity: 0, filter: "blur(8px)" }}
        whileInView={{ rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="w-full max-w-md"
      >
        <img
          src="Aboutme.jpg"
          alt="About me"
          className="rounded-[150px_0_150px_0] shadow-2xl w-full h-auto object-cover"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-6 max-w-xl"
      >
        <p className="uppercase text-sm tracking-widest text-gray-600 font-semibold">
          About Me
        </p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          Nutritionist & <br /> Naturopath
        </h2>
        <p className="text-gray-700 text-base">
          I offer free 15-minute Wellness Chats to help you understand what to
          expect from a treatment.
        </p>
        <p className="text-gray-700 text-base">
          If you're curious about my approach and want to see if we're a good
          fit, let's connect!
        </p>
        <a
          href="#"
          className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-full w-max transition"
        >
          Learn More →
        </a>
      </motion.div>
    </div>
  );
};

export default AboutMe;
