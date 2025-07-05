import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../axiosSecure";

const Allparcle = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: parcels = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });

  const handleEdit = (id) => {
    Swal.fire({
      icon: "info",
      title: "Edit Parcel",
      text: `Edit parcel with ID: ${id}`,
    });
  };

  const handleView = (id) => {
    Swal.fire({
      icon: "info",
      title: "View Parcel",
      text: `Viewing parcel ID: ${id}`,
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`parcels/${id}`); // Make sure this route is correct in backend
        await queryClient.invalidateQueries(["parcels"]);
        Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete parcel.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <p className="text-center text-blue-600 font-medium py-10">
        Loading parcels...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 font-medium py-10">
        Error loading parcels.
      </p>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        All Parcels
      </h1>

      {parcels?.length === 0 ? (
        <p className="text-center text-gray-500">No parcels available.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tracking ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Sender
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Receiver
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Cost
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Delivery Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Created
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody className="bg-white divide-y divide-gray-200">
                {parcels.map((parcel) => (
                  <motion.tr
                    key={parcel._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-blue-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {parcel.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {parcel.tracking_id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div>{parcel.sender_name || parcel.sender_email}</div>
                      <div className="text-xs text-gray-500">
                        {parcel.sender_district}, {parcel.sender_region}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div>{parcel.receiver_name}</div>
                      <div className="text-xs text-gray-500">
                        {parcel.receiver_district}, {parcel.receiver_region}
                      </div>
                    </td>
                    <td className="px-4 py-3">{parcel.delivery_cost}৳</td>
                    <td className="px-4 py-3 capitalize">
                      <span
                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                          parcel.delivery_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : parcel.delivery_status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {parcel.delivery_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 capitalize">
                      <span
                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                          parcel.payment_status === "unpaid"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {parcel.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(parcel.creation_date).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center space-x-3">
                      <button
                        onClick={() => handleView(parcel._id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(parcel._id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(parcel._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      )}
    </div>
  );
};

export default Allparcle;
