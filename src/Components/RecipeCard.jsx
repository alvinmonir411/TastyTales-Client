import React, { useState } from "react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { NavLink } from "react-router";


const RecipeCard = ({ recipe, recipes }) => {

  return (
    <div>
      <NavLink to={`/recipedeteils/${recipe._id}`}>
        <motion.div
          layout
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            scale: 1.03,
            boxShadow:
              "0 20px 30px rgba(0,0,0,0.15), 0 8px 15px rgba(0,0,0,0.1)",
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.97, transition: { duration: 0.15 } }}
          className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-100 max-w-sm mx-auto"
        >
          {/* Image Container with subtle scale zoom on hover */}
          <motion.div
            className="overflow-hidden h-48"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </motion.div>

          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 truncate">
              {recipe.title}
            </h3>
            <p className="text-gray-700 text-sm line-clamp-3 mb-4">
              {recipe.description}
            </p>

            <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
              <div>
                <span className="mr-1">⏱️</span> {recipe.cookingTime || "N/A"}
              </div>
              <div>
                <span className="mr-1">🍽️</span> {recipe.servings || "N/A"}{" "}
                servings
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {recipe.tags?.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </NavLink>
    </div>
  );
};

export default RecipeCard;
