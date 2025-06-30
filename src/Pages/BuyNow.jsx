import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../stripeform/CheckoutForm";
import { AuthContext } from "../Auth/AuthProvider";

// Initialize Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51ReGZaHI8fRZlaGvFtGl2cbH35I1XuCbC0Gyz0XUshomqGjXfUdFCJhVQfwLthJYtXPan6znRtftAsX4IWlzGBQ700QImNrKZ3"
);

const BuyNow = () => {
  const { user } = useContext(AuthContext); // Get logged in user info
  const { id } = useParams(); // Get recipe id from route params
  const [recipe, setRecipe] = useState(null); // Recipe details state
  const [orderinfo, setOrderinfo] = useState(null); // Order info collected from form

  // React Hook Form setup for form validation and data handling
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  // Fetch recipe details on component mount or id change
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}recipedetails/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Reset form default values when recipe loads
  useEffect(() => {
    if (recipe) {
      reset({ quantity: 1, location: "inside" });
    }
  }, [recipe, reset]);

  // Show loading UI if user or recipe data not ready
  if (!user || !recipe) return <div>Loading...</div>;

  // Watch form fields for quantity and location
  const quantity = watch("quantity") || 1;
  const location = watch("location") || "inside";

  // Calculate price based on recipe price, quantity and delivery charge
  const unitPrice = recipe?.price || 0;
  const deliveryCharge = location === "inside" ? 60 : 120;
  const totalPrice = unitPrice * quantity + deliveryCharge;

  // Handle form submission - collect order info and save to state
  const onSubmit = (data) => {
    const order = {
      buyerInfo: {
        ...data,
        name: user.displayName, // Use user display name (read-only field)
        email: user.email, // Use user email (read-only field)
      },
      sellerInfo: {
        email: recipe.author, // Recipe author's email
      },
      recipeId: recipe._id,
      title: recipe.title,
      price: recipe?.price,
      totalPrice,
      quantity,
      deliveryCharge,
    };
    setOrderinfo(order); // Save order info to state to show payment form
  };

  return (
    <div className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Buy Now</h2>

      {/* If order info exists, show Stripe payment form */}
      {orderinfo ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            onSubmit={() => {}}
            orderinfo={orderinfo}
            recipeId={recipe._id}
            totalPrice={totalPrice}
            quantity={quantity}
            deliveryCharge={deliveryCharge}
          />
        </Elements>
      ) : (
        // Otherwise, show the buyer info form
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name field (read-only from user context) */}
          <input
            {...register("name")}
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full"
          />

          {/* Phone input with validation */}
          <input
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          {/* Email field (read-only from user context) */}
          <input
            {...register("email")}
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
          />

          {/* Delivery address textarea with validation */}
          <textarea
            {...register("address", { required: "Address is required" })}
            placeholder="Full Delivery Address"
            className="textarea textarea-bordered w-full"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          {/* Delivery location select dropdown */}
          <div className="flex gap-4 items-center">
            <label>Delivery Location:</label>
            <select
              {...register("location")}
              className="select select-bordered"
            >
              <option value="inside">Inside Dhaka (৳60)</option>
              <option value="outside">Outside Dhaka (৳120)</option>
            </select>
          </div>

          {/* Quantity input */}
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              {...register("quantity", { min: 1 })}
              defaultValue={1}
              min={1}
              className="input input-bordered w-full"
            />
          </div>

          {/* Total price display */}
          <div className="text-lg font-semibold text-center mt-4">
            Total Payable:{" "}
            <span className="text-green-600">${Math.round(totalPrice)}</span>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-full mt-4">
            Proceed to Payment
          </button>
        </form>
      )}
    </div>
  );
};

export default BuyNow;
