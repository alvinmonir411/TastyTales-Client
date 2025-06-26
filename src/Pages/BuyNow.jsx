import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../stripeform/CheckoutForm";


const stripePromise = loadStripe(
  "pk_test_51ReGZaHI8fRZlaGvFtGl2cbH35I1XuCbC0Gyz0XUshomqGjXfUdFCJhVQfwLthJYtXPan6znRtftAsX4IWlzGBQ700QImNrKZ3"
);
const BuyNow = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}recipedetails/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (recipe) reset({ quantity: 1, location: "inside" });
  }, [recipe, reset]);

  if (!user || !recipe) return <div>Loading...</div>;

  const quantity = watch("quantity") || 1;
  const location = watch("location") || "inside";
  const unitPrice = recipe?.price || 0;
  const deliveryCharge = location === "inside" ? 60 : 120;
  const totalPrice = unitPrice * quantity + deliveryCharge;

  const onSubmit = (data) => {
    const order = {
      buyerInfo: { ...data },
      sellerInfo: {
        email: recipe.author,
      },

      recipeId: recipe._id,
      title: recipe.title,
      price:recipe?.price,
      totalPrice,
    };

    console.log("Order Info:", order);
    // axios.post("/addorder", order) ...
  } 

  return (
    <div
      className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Buy Now</h2>

      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Your Name"
        className="input input-bordered w-full"
        value={user?.displayName}
        readOnly
      />
      

      <input
        {...register("phone", { required: "Phone number is required" })}
        placeholder="Phone Number"
        className="input input-bordered w-full"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
        type="email"
        value={user?.email}
        readOnly
        className="input input-bordered w-full"
      />
    

      <textarea
        {...register("address", { required: "Address is required" })}
        placeholder="Full Delivery Address (comma-separated)"
        className="textarea textarea-bordered w-full"
      />
      {errors.address && (
        <p className="text-red-500 text-sm">{errors.address.message}</p>
      )}

      <div className="flex gap-4 items-center">
        <label>Delivery Location:</label>
        <select {...register("location")} className="select select-bordered">
          <option value="inside">Inside Dhaka (৳60)</option>
          <option value="outside">Outside Dhaka (৳120)</option>
        </select>
      </div>

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

      <div className="text-lg font-semibold text-center mt-4">
        Total Payable:{" "}
        <span className="text-green-600">৳{totalPrice.toFixed(2)}</span>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm onSubmit={onSubmit} totalPrice={totalPrice} />
        </Elements>
      </div>
    </div>
  );
};

export default BuyNow;
