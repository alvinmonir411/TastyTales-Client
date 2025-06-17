
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Auth/AuthProvider";
import { object } from "framer-motion/client";
import axios, { Axios } from "axios";
import { toast } from "react-toastify";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);
  const handleaddrecipe = (e) => {
    e.preventDefault()
    console.log("btn cliked"); 
    
    const form = e.target;
    const formdata = new FormData(form)
    const data = Object.fromEntries(formdata.entries())
    const Tags = data.tags.split(',').map(tag => tag.trim())
    data.tags = Tags;
    const Ingredients = data.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
    data.ingredients = Ingredients;

const Instructions = data.instructions.split(",").map((instr) => instr.trim());
data.instructions= Instructions


    console.log(data);
    axios
      .post(`${import.meta.env.VITE_URL}addrecipe` ,data)
      .then((response) => {
        toast.success('dones');
      })
      .catch((error) => {
        console.error("Error:", error);
      });


  }


  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl text-center font-semibold mt-5 "
      >{`Welcome ${user ? user.displayName : ""} to add recipe`}</motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-5"
        onSubmit={handleaddrecipe}
      >
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block mb-1 font-medium">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="ingredients" className="block mb-1 font-medium">
            Ingredients (comma separated)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="instructions" className="block mb-1 font-medium">
            Instructions (comma separated)
          </label>
          <textarea
            id="instructions"
            name="instructions"
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block mb-1 font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="cookingTime" className="block mb-1 font-medium">
            Cooking Time
          </label>
          <input
            type="text"
            id="cookingTime"
            name="cookingTime"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="servings" className="block mb-1 font-medium">
            Servings
          </label>
          <input
            type="number"
            id="servings"
            name="servings"
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="author" className="block mb-1 font-medium">
            Author
          </label>
          <input
            type="text"
            defaultValue={user?.email}
            readOnly
            name="author"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="dateCreated" className="block mb-1 font-medium">
            Date Created
          </label>
          <input
            type="date"
            id="dateCreated"
            name="dateCreated"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block mb-1 font-medium">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold shadow-md transition-colors"
        >
          Add Recipe
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddRecipe;
