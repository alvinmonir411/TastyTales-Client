import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { MdEqualizer } from 'react-icons/md';
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
const DashbordHome = () => {
  const [totaldata,settotaldata]= useState([])
const [sellar, setSeller] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}allrecipe/admin`).then((data) => {
      settotaldata(data.data);
    });
    
  }, []);

 
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_URL}uniqueauthors`)
        .then((data) => {
          setSeller(data.data);
        })
        .catch((error) => {
          console.error("Error fetching unique authors:", error.message);
        });
    }, []);

  return (
    <motion.div
      
      className="w-[80vw] m-10  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-10 capitalize"
    >
      {/* for total recipe */}
      <div className="card bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out p-6 flex flex-col items-center justify-center text-center space-y-4 transform hover:scale-105">
        <NavLink
          to="/allrecipe"
          className="flex flex-col items-center space-y-2"
        >
          <MdEqualizer size={48} className="text-blue-800 drop-shadow" />
          <h1 className="text-2xl font-bold text-gray-800">Total Recipe</h1>
          <p className="text-blue-900 font-black text-5xl">
            <CountUp end={totaldata.length} duration={5} />
          </p>
        </NavLink>
      </div>

      {/* for total seller */}
      <div className="card bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out rounded-xl p-6 flex flex-col justify-center items-center space-y-3">
        <MdEqualizer size={40} className="text-blue-700" />
        <h1 className="font-bold text-center text-xl text-gray-800">
          Total sellar
        </h1>
        <p className="text-blue-900 font-black text-5xl">
          <CountUp end={sellar.length} duration={5} />
        </p>
      </div>
    </motion.div>
  );
}

export default DashbordHome
