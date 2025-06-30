import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Auth/AuthProvider";

const BeARider = () => {
  const districtData = useLoaderData();
  const [loading, setLoading] = useState(false);
  const { user } = use(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Watch selected region to filter districts dynamically
  const selectedRegion = watch("region");

  // Get unique regions from data
  const uniqueRegions = [...new Set(districtData.map((item) => item.region))];

  // Get all districts belonging to selected region
  const selectedDistricts = districtData
    .filter((item) => item.region === selectedRegion)
    .map((item) => item.district);

  // Remove duplicates in districts just in case
  const uniqueDistricts = [...new Set(selectedDistricts)];

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      // Upload image to ImgBB
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      const ImageUrl = imgRes.data.data.url;

      // Create new rider object with uploaded image URL and additional info
      const NewRider = {
        ...data,
        photo: ImageUrl,
        status: "Pending",
        applyed: new Date(),
      };

      // send data backend
      axios.post(`${import.meta.env.VITE_URL}Riders`, NewRider).then((res) => {
        if (res.data.insertedId) {
          reset();
          toast.success("you have succesfully Appiled");
          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Error uploading image or submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-xl mx-auto p-6 space-y-5 bg-white rounded shadow"
    >
      {/* Full Name */}
      <div>
        <label className="block font-semibold mb-1">Full Name</label>
        <input
          type="text"
          {...register("fullName", { required: "Full Name is required" })}
          className="w-full border px-3 py-2 rounded"
          readOnly
          defaultValue={user.displayName}
        />
        {errors.fullName && (
          <p className="text-red-600 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block font-semibold mb-1">Phone</label>
        <input
          type="tel"
          {...register("phone", { required: "Phone is required" })}
          className="w-full border px-3 py-2 rounded"
          placeholder="01XXXXXXXXX"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full border px-3 py-2 rounded"
          readOnly
          defaultValue={user.email}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block font-semibold mb-1">Address</label>
        <input
          type="text"
          {...register("address", { required: "Address is required" })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Street, Area"
        />
        {errors.address && (
          <p className="text-red-600 text-sm">{errors.address.message}</p>
        )}
      </div>

      {/* Region & District */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Region</label>
          <select
            {...register("region", { required: "Region is required" })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Region</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red-600 text-sm">{errors.region.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">District</label>
          <select
            {...register("district", { required: "District is required" })}
            className="w-full border px-3 py-2 rounded"
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
            <p className="text-red-600 text-sm">{errors.district.message}</p>
          )}
        </div>
      </div>

      {/* Age */}
      <div>
        <label className="block font-semibold mb-1">Age</label>
        <input
          type="number"
          {...register("age", {
            required: "Age is required",
            min: { value: 18, message: "Must be 18 or older" },
          })}
          className="w-full border px-3 py-2 rounded"
          placeholder="18+"
        />
        {errors.age && (
          <p className="text-red-600 text-sm">{errors.age.message}</p>
        )}
      </div>

      {/* NID Number */}
      <div>
        <label className="block font-semibold mb-1">NID Number</label>
        <input
          type="text"
          {...register("nid", {
            required: "NID is required",
            minLength: { value: 10, message: "Must be at least 10 digits" },
          })}
          className="w-full border px-3 py-2 rounded"
          placeholder="1234567890"
        />
        {errors.nid && (
          <p className="text-red-600 text-sm">{errors.nid.message}</p>
        )}
      </div>

      {/* Vehicle Type */}
      <div>
        <label className="block font-semibold mb-1">Vehicle Type</label>
        <select
          {...register("vehicle", { required: true })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Vehicle</option>
          <option value="Bike">Bike</option>
          <option value="Bicycle">Bicycle</option>
          <option value="Car">Car</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Experience */}
      <div>
        <label className="block font-semibold mb-1">
          Experience (Optional)
        </label>
        <textarea
          {...register("experience")}
          rows="3"
          placeholder="Any relevant delivery experience..."
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block font-semibold mb-1">Upload Photo</label>
        <input
          type="file"
          accept="image/*"
          {...register("photo", { required: "Photo is required" })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.photo && (
          <p className="text-red-600 text-sm">{errors.photo.message}</p>
        )}
      </div>

      {/* Submit */}
      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded font-semibold transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
};

export default BeARider;
