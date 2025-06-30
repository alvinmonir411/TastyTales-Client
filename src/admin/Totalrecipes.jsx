import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthProvider";
import axiosSecure from "../axiosSecure";

const Totalrecipes = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all recipes (admin)
  useEffect(() => {
    axiosSecure
      .get(`allrecipe/admin`)
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user]);

  // Handle Delete (stub)
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      // Example delete logic (uncomment for real)
      // axios.delete(`${import.meta.env.VITE_URL}recipes/${id}`)
      //   .then(() => { setRecipes(recipes.filter(r => r._id !== id)) })
      //   .catch(err => console.error(err));
      console.log("Deleted:", id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <motion.div
      className="overflow-x-auto p-4 md:p-10 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-neutral">
        🍽️ Manage All Recipes
      </h2>

      <motion.table
        className="table table-zebra table-md rounded-xl shadow-lg bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <thead className="bg-base-200 text-sm uppercase">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Price</th>
            <th>Difficulty</th>
            <th>Time</th>
            <th>Tags</th>
            <th>Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <motion.tr
              key={recipe._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <td>{index + 1}</td>
              <td className="font-medium text-primary">{recipe.title}</td>
              <td>{recipe.author}</td>
              <td>{recipe.category}</td>
              <td>৳{recipe.price}</td>
              <td>
                <span className="badge badge-sm badge-outline">
                  {recipe.difficulty}
                </span>
              </td>
              <td>{recipe.cookingTime}</td>
              <td>
                {recipe.tags?.map((tag, i) => (
                  <span key={i} className="badge badge-ghost badge-sm mr-1">
                    {tag}
                  </span>
                ))}
              </td>
              <td>{new Date(recipe.dateCreated).toLocaleDateString()}</td>
              <td>
                <div className="flex justify-center gap-3 text-lg">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => console.log("View:", recipe._id)}
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => console.log("Edit:", recipe._id)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(recipe._id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default Totalrecipes;
