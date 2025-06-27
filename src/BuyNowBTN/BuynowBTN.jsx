import React from 'react'
import { FaShoppingBag } from 'react-icons/fa';
import { NavLink } from 'react-router';

const BuynowBTN = ({recipe,id}) => {
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        <FaShoppingBag /> Buy Now
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative p-6 rounded-xl shadow-lg bg-white max-w-md mx-auto">
          {/* Close Button */}
          <form method="dialog" className="absolute right-3 top-3">
            <button className="text-gray-500 hover:text-red-500 text-xl font-bold">
              ✕
            </button>
          </form>

          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            {recipe.title}
          </h3>
          <div className="text-center mb-4">
            {/* Quantity & Location */}

            {/* Dynamic Price */}
            <div className="text-center mt-4 text-lg font-semibold text-green-600">
              Total Price: ৳{recipe?.price}
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <span className="font-medium">Category:</span> {recipe.category}
            </div>
            <div>
              <span className="font-medium">Cooking Time:</span>{" "}
              {recipe.cookingTime}
            </div>
            <div>
              <span className="font-medium">Servings:</span> {recipe.servings}
            </div>
          </div>

          {/* Confirm Button */}
          <div className="mt-6 flex justify-center">
            <NavLink
              to={`/buynow/${id}`}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
            >
              <FaShoppingBag />
              Proceed to Checkout
            </NavLink>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default BuynowBTN
