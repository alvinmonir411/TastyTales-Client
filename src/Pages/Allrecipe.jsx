import axios from "axios";
import React, { useState, useEffect } from "react";
import RecipeCard from "./../Components/RecipeCard";
const Allrecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPage = Math.ceil(totalRecipes / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_URL
        }allrecipe?size=${itemsPerPage}&page=${currentPage}`
      )
      .then((response) => {
        setRecipes(response.data.recipes);
        setTotalRecipes(response.data.total);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch recipes.");
        setLoading(false);
      });
  }, [currentPage, itemsPerPage]);

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
        {recipes.map((singleRecipe) => (
          <RecipeCard
            key={singleRecipe._id}
            recipe={singleRecipe}
            recipes={recipes}
          />
        ))}
      </div>
      <div className="flex flex-row justify-center mt-8 gap-2 items-center">
        {[...Array(totalPage)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-400 text-white flex btn flex-row justify-center mt-8 mb-8 gap-2"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Allrecipe;
