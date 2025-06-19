import axios from "axios";
import React, { useState, useEffect } from "react";
import RecipeCard from "../Components/RecipeCard";

const Allrecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // fro pagination

  const [curentPage, setcurentPage] = useState(1);
  const itemperpage = 10;
  const totalPage = Math.ceil(recipes.length / itemperpage);



  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}allrecipe`)
      .then((response) => {
        setRecipes(response.data);

        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch recipes.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-5xl text-center text-blue-500 font-bold">
        Loading recipes...
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {recipes
          .slice((curentPage-1) *itemperpage,curentPage*itemperpage)
          .map((singleRecipe) => (
          <RecipeCard
            key={singleRecipe._id}
            recipe={singleRecipe}
            recipes={recipes}
          />
        ))}{" "}
      </div>
      <div className="flex flex-row justify-center mt-8 gap-2 items-center  ">
        {[...Array(totalPage)].map((_, index) => (
          <button
            onClick={() => {
              setcurentPage(index + 1);
            }}
            className={`px-3 py-1 rounded ${
              curentPage === index + 1
                ? " bg-blue-400 text-white flex btn flex-row justify-center mt-8 mb-8 gap-2"
                : "bg-gray-200"
            }`}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Allrecipe;
