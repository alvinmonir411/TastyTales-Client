import axios from "axios";
import React, { useState, useEffect } from "react";
import RecipeCard from "../Components/RecipeCard";

const Allrecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-5xl text-center text-blue-500 font-bold">Loading recipes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {recipes.map((singleRecipe) => (
        <RecipeCard key={singleRecipe._id} recipe={singleRecipe} />
      ))}
    </div>
  );
};

export default Allrecipe;
