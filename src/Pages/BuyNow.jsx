import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";

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
        email: recipe?.email,
        name: recipe?.name,
        phone: recipe?.phone,
        address: recipe?.address,
        // add more fields as needed
      },
      recipeId: recipe._id,
      title: recipe.title,
      totalPrice,
    };

    console.log("Order Info:", order);
    // axios.post("/addorder", order) ...
  } 

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Buy Now</h2>

      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Your Name"
        className="input input-bordered w-full"
        defaultValue={user?.displayName}
        readOnly
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

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
        defaultValue={user?.email}
        readOnly
        className="input input-bordered w-full"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

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

      {user && (
        <button type="submit" className="btn btn-primary w-full mt-2">
          Place Order
        </button>
      )}
    </form>
  );
};

export default BuyNow;
