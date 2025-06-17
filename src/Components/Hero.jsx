import React from "react";
import { motion } from 'framer-motion';
import { NavLink } from "react-router";
import { div } from "framer-motion/client";
import { GoArrowUpRight } from "react-icons/go";
import { VscNotebook } from "react-icons/vsc";
import { FcElectroDevices } from "react-icons/fc";
import { FaAlgolia } from "react-icons/fa6";
import { GiNuclearPlant } from "react-icons/gi";

const Hero = () => {
  return (
    <div>
      <div className=" p-10   bg-[#344742] h-full pb-50 text-white">
        <div className="container mx-auto  flex justify-around items-center flex-1">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-2xl md:text-7xl font-bold "
            >
              Honest <br /> nutrition for
              <br /> healthy
              <br /> weight loss
            </motion.h1>
            <motion.button
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="rounded-tl-[50px] rounded-br-[50px] bg-blue-900 border-white capitalize text-2xl  text-white font-semibold px-20 py-6 mt-10  flex items-center gap-2 transition-all"
            >
              view recipe
            </motion.button>
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 360 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
         
            >
              <img
                src="/hero_img.jpg" 
                className=" h-[70vh] rounded-t-[100px] "
                alt="Hero"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 360 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="bg-blue-800 w-[300px] h-60 p-5 text-center rounded-tr-[90px]  absolute -bottom-10 -left-26 "
            >
              <div className="p-5">
                <p className="text-5xl font-semibold">10+</p>
                <p className="text-4xl font-semibold">Years of experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div>
        <div className=" container mb-10 mx-auto  flex -mt-25 justify-around gap-5 items-center">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white shadow-2xl p-10 text-center font-bold flex flex-col items-center gap-5 justify-center"
          >
            <div>
              <VscNotebook size={60} />
            </div>
            <div>
              <h1 className="text-xl">Healthy Breakfast</h1>
              <p className="font-normal text-gray-600 text-sm">
                Start your day with energizing, protein-rich meals packed with
                nutrition.
              </p>
            </div>
            <NavLink className="text-yellow-600 hover:underline">
              Explore
            </NavLink>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white shadow-2xl p-10 text-center font-bold flex flex-col items-center gap-5 justify-center"
          >
            <div>
              <FcElectroDevices size={60} />
            </div>
            <div>
              <h1 className="text-xl">Quick Snacks</h1>
              <p className="font-normal text-gray-600 text-sm">
                Tasty and quick snack ideas to satisfy your cravings in minutes.
              </p>
            </div>
            <NavLink className="text-yellow-600 hover:underline">
              Explore
            </NavLink>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white shadow-2xl p-10 text-center font-bold flex flex-col items-center gap-5 justify-center"
          >
            <div>
              <FaAlgolia size={60} />
            </div>
            <div>
              <h1 className="text-xl">Vegan Delights</h1>
              <p className="font-normal text-gray-600 text-sm">
                Explore delicious plant-based dishes that everyone will love.
              </p>
            </div>
            <NavLink className="text-yellow-600 hover:underline">
              Explore
            </NavLink>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white shadow-2xl p-10 text-center font-bold flex flex-col items-center gap-5 justify-center"
          >
            <div>
              <GiNuclearPlant size={60} />
            </div>
            <div>
              <h1 className="text-xl">Traditional Meals</h1>
              <p className="font-normal text-gray-600 text-sm">
                Discover time-tested, flavorful recipes passed through
                generations.
              </p>
            </div>
            <NavLink className="text-yellow-600 hover:underline">
              Explore
            </NavLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Hero;