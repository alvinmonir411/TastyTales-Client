import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../stripeform/CheckoutForm";
import { AuthContext } from "../Auth/AuthProvider";

const stripePromise = loadStripe(
  "pk_test_51ReGZaHI8fRZlaGvFtGl2cbH35I1XuCbC0Gyz0XUshomqGjXfUdFCJhVQfwLthJYtXPan6znRtftAsX4IWlzGBQ700QImNrKZ3"
);

const BuyNow = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const datas = useLoaderData();

  const [recipe, setRecipe] = useState(null);
  const [orderinfo, setOrderinfo] = useState(null);

  // Extract unique regions
  const uniqueRegions = Array.from(new Set(datas?.map((d) => d.region))).filter(
    Boolean
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  // Watch the region value
  const selectedRegion = watch("region");

  // Get unique districts for selected region
  const uniqueDistricts = selectedRegion
    ? Array.from(
        new Set(
          datas
            .filter((d) => d.region === selectedRegion)
            .map((d) => d.district)
        )
      ).filter(Boolean)
    : [];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}recipedetails/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (recipe) {
      reset({ quantity: 1, location: "inside" });
    }
  }, [recipe, reset]);

  if (!user || !recipe)
    return <div className="text-center py-20">Loading...</div>;

  const quantity = watch("quantity") || 1;
  const location = watch("location") || "inside";
  const unitPrice = recipe?.price || 0;
  const deliveryCharge = location === "inside" ? 60 : 120;
  const totalPrice = unitPrice * quantity + deliveryCharge;

  const onSubmit = (data) => {
    const order = {
      buyerInfo: {
        ...data,
        name: user.displayName,
        email: user.email,
      },
      sellerInfo: {
        email: recipe.author,
      },
      recipeId: recipe._id,
      title: recipe.title,
      price: recipe?.price,
      totalPrice,
      quantity,
      deliveryCharge,
      delivery_status: null,
    };
    setOrderinfo(order);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center text-primary">Buy Now</h2>

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            {...register("name")}
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full"
          />

          {/* Phone */}
          <input
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          {/* Email */}
          <input
            {...register("email")}
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
          />

          {/* Address */}
          <textarea
            {...register("address", { required: "Address is required" })}
            placeholder="Full Delivery Address"
            className="textarea textarea-bordered w-full"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          {/* Region */}
          <select
            {...register("region", { required: "Region is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Region</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red-500 text-sm">{errors.region.message}</p>
          )}

          {/* District */}
          <select
            {...register("district", { required: "District is required" })}
            className="select select-bordered w-full"
            disabled={!selectedRegion}
          >
            <option value="">Select District</option>
            {uniqueDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district.message}</p>
          )}

          {/* Location inside/outside Dhaka */}
          <select
            {...register("location")}
            className="select select-bordered w-full"
          >
            <option value="inside">Inside Dhaka (৳60)</option>
            <option value="outside">Outside Dhaka (৳120)</option>
          </select>

          {/* Quantity */}
          <input
            type="number"
            {...register("quantity", { min: 1 })}
            defaultValue={1}
            min={1}
            className="input input-bordered w-full"
          />

          {/* Total Price */}
          <div className="text-lg font-semibold text-center mt-4">
            Total Payable:{" "}
            <span className="text-green-600">৳{Math.round(totalPrice)}</span>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Proceed to Payment
          </button>
        </form>
      )}
    </div>
  );
};

export default BuyNow;
