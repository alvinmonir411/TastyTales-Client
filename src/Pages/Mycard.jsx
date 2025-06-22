import React, { use } from 'react';

import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { CardContext } from '../Auth/Cardprover';

const Mycard = () => {
  const { cardData } = use(CardContext)

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-800">
        🛒 Your Cart
      </h1>

      {cardData.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          <p>Your cart is empty.</p>
          <Link
            to="/Allrecipe"
            className="inline-block mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardData.map((item, index) => (
            <motion.div
              key={index}
              className="border rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 bg-white"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full md:w-40 h-40 object-cover rounded-md"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm">{item.category}</p>
                </div>
                <Link
                  to={`/recipedetails?id=${item._id}`}
                  className="mt-3 inline-block text-blue-500 hover:underline text-sm"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Mycard;



