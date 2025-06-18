import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { VscNotebook } from "react-icons/vsc";
import { FcElectroDevices } from "react-icons/fc";
import { FaAlgolia } from "react-icons/fa6";
import { GiNuclearPlant } from "react-icons/gi";

const Hero = () => {
  return (
    <div>
      {/* Hero Top Section */}
      <div className="p-10 pb-50 bg-[#1a1f1e] text-white">
        <div className="container mx-auto flex justify-around flex-wrap items-center">
          {/* Text Area */}
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-2xl md:text-7xl font-bold leading-tight"
            >
              Honest <br /> nutrition for
              <br /> healthy
              <br /> weight loss
            </motion.h1>
            <motion.button
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="rounded-tl-[50px] rounded-br-[50px] bg-[#ffc107] text-[#1a1f1e] capitalize text-2xl font-semibold px-20 py-6 mt-10 flex items-center gap-2 transition-all"
            >
              view recipe
            </motion.button>
          </div>

          {/* Image Area */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 360 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src="/hero_img.jpg"
                className="h-[70vh] rounded-t-[100px]"
                alt="Hero"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 360 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="bg-[#ffc107] text-[#1a1f1e] w-[300px] h-60 p-5 text-center rounded-tr-[90px] absolute -bottom-10 -left-26"
            >
              <div className="p-5">
                <p className="text-5xl font-bold">10+</p>
                <p className="text-3xl font-semibold">Years of experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mb-10 mx-auto grid md:grid-cols-4 gap-5 items-center -mt-16">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white border-b-[6px] border-b-[#ffc107] rounded-tr-[70px] shadow-2xl p-10 text-center font-bold flex flex-col items-center gap-5 justify-center"
        >
          <VscNotebook size={60} />
          <div>
            <h1 className="text-xl text-[#1a1f1e]">Healthy Breakfast</h1>
            <p className="font-normal text-gray-600 text-sm">
              Start your day with energizing, protein-rich meals packed with
              nutrition.
            </p>
          </div>
          <NavLink className="text-[#ffc107] hover:underline">Explore</NavLink>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white border-b-[6px] border-b-[#ffc107] rounded-tr-[70px] shadow-2xl p-10 text-center font-bold flex flex-col items-center gap-5 justify-center"
        >
          <FcElectroDevices size={60} />
          <div>
            <h1 className="text-xl text-[#1a1f1e]">Quick Snacks</h1>
            <p className="font-normal text-gray-600 text-sm">
              Tasty and quick snack ideas to satisfy your cravings in minutes.
            </p>
          </div>
          <NavLink className="text-[#ffc107] hover:underline">Explore</NavLink>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white border-b-[6px] border-b-[#ffc107] rounded-tr-[70px] shadow-2xl p-10 text-center font-bold flex flex-col items-center gap-5 justify-center"
        >
          <FaAlgolia size={60} />
          <div>
            <h1 className="text-xl text-[#1a1f1e]">Vegan Delights</h1>
            <p className="font-normal text-gray-600 text-sm">
              Explore delicious plant-based dishes that everyone will love.
            </p>
          </div>
          <NavLink className="text-[#ffc107] hover:underline">Explore</NavLink>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white border-b-[6px] border-b-[#ffc107] rounded-tr-[70px] shadow-2xl p-10 text-center font-bold flex flex-col items-center gap-5 justify-center"
        >
          <GiNuclearPlant size={60} />
          <div>
            <h1 className="text-xl text-[#1a1f1e]">Traditional Meals</h1>
            <p className="font-normal text-gray-600 text-sm">
              Discover time-tested, flavorful recipes passed through
              generations.
            </p>
          </div>
          <NavLink className="text-[#ffc107] hover:underline">Explore</NavLink>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
