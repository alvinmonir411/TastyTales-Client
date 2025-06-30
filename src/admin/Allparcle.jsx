import React, { useState } from "react";
import { useLoaderData } from "react-router"; 
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import axios from "axios"; // fixed axios import

const Allparcle = () => {
  const loadedParcels = useLoaderData();
  const [parcels, setParcels] = useState(loadedParcels || []);

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
      axios
        .delete(`${import.meta.env.VITE_URL}parcle/${id}`) 
        .then(() => {
          setParcels(parcels.filter((parcel) => parcel._id !== id));
          Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
        })
        .catch(() => {
          Swal.fire("Error", "Failed to delete parcel.", "error");
        });
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        All Parcels
      </h1>

      {parcels.length === 0 ? (
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
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">
                      {parcel.title}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {parcel.tracking_id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      <div>{parcel.sender_name || parcel.sender_email}</div>
                      <div className="text-xs text-gray-500">
                        {parcel.sender_district}, {parcel.sender_region}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      <div>{parcel.receiver_name}</div>
                      <div className="text-xs text-gray-500">
                        {parcel.receiver_district}, {parcel.receiver_region}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {parcel.delivery_cost}৳
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap capitalize">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                    <td className="px-4 py-3 whitespace-nowrap capitalize">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          parcel.payment_status === "unpaid"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {parcel.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(parcel.creation_date).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center space-x-3">
                      <button
                        onClick={() => handleView(parcel._id)}
                        className="text-gray-600 hover:text-gray-800"
                        type="button"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(parcel._id)}
                        className="text-blue-600 hover:text-blue-800"
                        type="button"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(parcel._id)}
                        className="text-red-600 hover:text-red-800"
                        type="button"
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
