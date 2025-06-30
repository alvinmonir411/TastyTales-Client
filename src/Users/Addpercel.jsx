import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../Auth/AuthProvider";

const AddParcel = () => {
  const { user } = useContext(AuthContext);
  const datas = useLoaderData();

  const regions = [...new Set(datas?.map((data) => data.region))];

  const { register, watch, handleSubmit, reset } = useForm();

  const type = watch("type");
  const weight = parseFloat(watch("weight")) || 0;
  const senderRegion = watch("sender_region");
  const senderDistrict = watch("sender_district");
  const receiverRegion = watch("receiver_region");
  const receiverDistrict = watch("receiver_district");

  const senderCenters = datas.filter((d) => d.region === senderRegion);
  const receiverCenters = datas.filter((d) => d.region === receiverRegion);

  const calculateCost = () => {
    const sameDistrict = senderDistrict === receiverDistrict;
    if (type === "document") {
      return sameDistrict ? 60 : 80;
    }
    if (weight <= 3) {
      return sameDistrict ? 110 : 150;
    }
    let base = sameDistrict ? 110 : 150;
    let extra = (weight - 3) * 40;
    if (!sameDistrict) extra += 40;
    return base + extra;
  };

  const onSubmit = async (data) => {
    const cost = calculateCost();

    const result = await Swal.fire({
      title: `Estimated Cost: ৳${cost}`,
      html: `
        <div class="text-left">
          <p><strong>Parcel Type:</strong> ${type}</p>
          <p><strong>Weight:</strong> ${weight || "N/A"} kg</p>
          <p><strong>From:</strong> ${senderDistrict}</p>
          <p><strong>To:</strong> ${receiverDistrict}</p>
          <p><strong>Delivery Cost:</strong> <span class="text-blue-600 font-bold">৳${cost}</span></p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const finalData = {
        ...data,
        tracking_id: "TRK" + Date.now(),
        sender_email: user?.email,
        delivery_cost: cost,
        payment_status: "unpaid",
        delivery_status: "pending",
        created_by: user?.email,
        creation_date: new Date().toISOString(),
      };
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_URL}addparcel`,
          finalData
        );
        if (res.data.insertedId) {
          reset();
          Swal.fire("Success", "Parcel booked successfully!", "success");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to book parcel.", "error");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 max-w-5xl mx-auto space-y-12"
    >
      <h1 className="text-3xl font-bold text-center mb-1">Book Your Parcel</h1>
      <p className="text-center text-gray-600 mb-6">
        Door to Door Parcel Delivery
      </p>

      {/* Parcel Info */}
      <fieldset className="border rounded-lg p-6 shadow-md space-y-6">
        <legend className="font-bold text-xl px-2">Parcel Info</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <select
            {...register("type", { required: "Parcel type is required" })}
            className="input input-bordered w-full"
          >
            <option value="">Select Parcel Type</option>
            <option value="document">Document</option>
            <option value="non-document">Non-Document</option>
          </select>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className="input input-bordered w-full"
          />
          {type === "non-document" && (
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("weight", {
                required: "Weight is required for Non-Document",
              })}
              placeholder="Weight in kg"
              className="input input-bordered w-full"
            />
          )}
        </div>
      </fieldset>

      {/* Sender Info */}
      <fieldset className="border rounded-lg p-6 shadow-md space-y-6">
        <legend className="font-bold text-xl px-2">Sender Info</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <input
            readOnly
            value={user?.displayName || ""}
            className="input input-bordered w-full bg-gray-100"
            placeholder="Sender Name"
          />
          <input
            {...register("sender_contact", {
              required: "Sender contact is required",
            })}
            placeholder="Sender Contact"
            className="input input-bordered w-full"
          />
          <select
            {...register("sender_region", {
              required: "Sender region is required",
            })}
            className="input input-bordered w-full"
          >
            <option value="">Select Region</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            {...register("sender_district", {
              required: "Sender district is required",
            })}
            className="input input-bordered w-full"
          >
            <option value="">Select District</option>
            {senderCenters.map((d) => (
              <option key={d.district} value={d.district}>
                {d.district}
              </option>
            ))}
          </select>
          <select
            {...register("sender_center", {
              required: "Sender center is required",
            })}
            className="input input-bordered w-full"
          >
            <option value="">Select Service Center</option>
            {datas
              .find((d) => d.district === senderDistrict)
              ?.covered_area?.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
          </select>
          <textarea
            {...register("sender_address", {
              required: "Sender address is required",
            })}
            placeholder="Sender Address"
            className="textarea textarea-bordered w-full resize-none"
            rows={3}
          />
          <textarea
            {...register("pickup_instruction", {
              required: "Pickup instruction is required",
            })}
            placeholder="Pickup Instruction"
            className="textarea textarea-bordered w-full resize-none"
            rows={3}
          />
        </div>
      </fieldset>

      {/* Receiver Info */}
      <fieldset className="border rounded-lg p-6 shadow-md space-y-6">
        <legend className="font-bold text-xl px-2">Receiver Info</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <input
            {...register("receiver_name", {
              required: "Receiver name is required",
            })}
            placeholder="Receiver Name"
            className="input input-bordered w-full"
          />
          <input
            {...register("receiver_contact", {
              required: "Receiver contact is required",
            })}
            placeholder="Receiver Contact"
            className="input input-bordered w-full"
          />
          <select
            {...register("receiver_region", {
              required: "Receiver region is required",
            })}
            className="input input-bordered w-full"
          >
            <option value="">Select Region</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            {...register("receiver_district", {
              required: "Receiver district is required",
            })}
            className="input input-bordered w-full"
          >
            <option value="">Select District</option>
            {receiverCenters.map((d) => (
              <option key={d.district} value={d.district}>
                {d.district}
              </option>
            ))}
          </select>
          <select
            {...register("receiver_center", {
              required: "Receiver center is required",
            })}
            className="input input-bordered w-full"
          >
            <option value="">Select Service Center</option>
            {datas
              .find((d) => d.district === receiverDistrict)
              ?.covered_area?.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
          </select>
          <textarea
            {...register("receiver_address", {
              required: "Receiver address is required",
            })}
            placeholder="Receiver Address"
            className="textarea textarea-bordered w-full resize-none"
            rows={3}
          />
          <textarea
            {...register("delivery_instruction", {
              required: "Delivery instruction is required",
            })}
            placeholder="Delivery Instruction"
            className="textarea textarea-bordered w-full resize-none"
            rows={3}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        className="btn btn-primary w-full py-3 text-lg font-semibold"
      >
        Submit
      </button>
    </form>
  );
};

export default AddParcel;
