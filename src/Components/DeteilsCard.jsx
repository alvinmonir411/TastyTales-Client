import React, { use, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { NavLink, useParams } from "react-router";

import { toast } from "react-toastify";
import { CardContext } from "../Auth/Cardprover";
import BuynowBTN from "../BuyNowBTN/BuynowBTN";


const DeteilsCard = ({ recipe }) => {
  const { id } = useParams()
  
  const { count, setCount, cardData, setCardData } = use(CardContext);

  const handleCardBtn = () => {
    const exists = cardData.find((item) => item._id === recipe._id);
    if (exists) {
      toast.error("Already added to cart!");
      return;
    }
    setCount(count + 1)
    setCardData([...cardData, recipe]);
    toast.success("Item added to cart!");
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-6">{recipe.title}</h1>

        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[400px] object-cover rounded-xl shadow-md mb-8"
        />

        {/* Buttons */}
        <div className="flex justify-end items-center mb-6">
          <div className="mt-4 flex justify-center gap-4">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <BuynowBTN recipe={recipe} id={ id} />

            <button
              onClick={handleCardBtn}
              className="bg-blue-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-600 transition flex items-center gap-2"
            >
              <AiOutlineShoppingCart /> Add to Cart
            </button>
          </div>
        </div>

        <div className="text-2xl font-semibold text-green-600 mb-4 text-center">
          Price: ${recipe.price?.toFixed(2)}
        </div>
        {/* Description */}
        <p className="text-lg text-gray-700 mb-4">{recipe.description}</p>

        {/* Ingredients & Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {recipe.ingredients?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {recipe.instructions?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Other Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Author:</span> {recipe.author}
          </div>
          <div>
            <span className="font-semibold">Date:</span> {recipe.dateCreated}
          </div>
          <div>
            <span className="font-semibold">Category:</span> {recipe.category}
          </div>
          <div>
            <span className="font-semibold">Difficulty:</span>{" "}
            {recipe.difficulty}
          </div>
          <div>
            <span className="font-semibold">Cooking Time:</span>{" "}
            {recipe.cookingTime}
          </div>
          <div>
            <span className="font-semibold">Servings:</span> {recipe.servings}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6">
          <h3 className="font-semibold text-blue-800 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeteilsCard;
