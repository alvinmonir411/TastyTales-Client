import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: pendingRiders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}pendingRiders`
      );
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ riderId, status }) => {
      return await axios.patch(
        `${import.meta.env.VITE_URL}pendingRiders/${riderId}`,
        {
          status,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingRiders"]);
    },
    onError: (err) => {
      console.error("Status update failed:", err);
    },
  });
  // foraprovemutaion
  const approveMutation = useMutation({
    mutationFn: (riderId) =>
      axios.patch(`${import.meta.env.VITE_URL}riders/${riderId}/approve`),
    onSuccess: () => {
      toast.success("Rider approved successfully");
      queryClient.invalidateQueries(["pendingRiders"]);
    },
    onError: () => {
      toast.error("Failed to approve rider");
    },
  });
  const declineMutation = useMutation({
    mutationFn: (riderId) =>
      axios.delete(`${import.meta.env.VITE_URL}riders/${riderId}`),
    onSuccess: () => {
      toast.info("Rider declined successfully");
      queryClient.invalidateQueries(["pendingRiders"]); // refetch list
    },
    onError: () => {
      toast.error("Failed to decline rider");
    },
  });

  // Function to call on button click
  const handleDecline = (riderId) => {
    declineMutation.mutate(riderId);
  };
  const handleApprove = (riderId) => {
    approveMutation.mutate(riderId);
  };
 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-3xl md:text-4xl font-semibold text-gray-700 animate-pulse">
          Loading Riders...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <p className="text-xl text-red-700 font-medium">
          Error: {error?.message || "Something went wrong while fetching data."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10 mt-8 leading-tight">
          Pending Rider Applications
        </h1>

        {pendingRiders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-xl text-gray-600 font-medium">
              No pending rider applications found at the moment.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "#",
                    "Rider Name",
                    "Email",
                    "Phone",
                    "Region",
                    "District",
                    "Status",
                    "Actions",
                  ].map((heading, i) => (
                    <th
                      key={i}
                      className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                        heading === "Actions" ? "text-center" : ""
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pendingRiders.map((rider, index) => (
                  <tr
                    key={rider._id || index}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {rider.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {rider.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {rider.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {rider.region}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {rider.district}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {rider.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium">
                      <button
                        onClick={() => setSelectedRider(rider)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleApprove(rider._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(rider._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedRider && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRider(null)}
          >
            <motion.div
              className="bg-gradient-to-r from-pink-300 via-red-300 to-pink-100 rounded-lg shadow-lg max-w-lg w-full p-6 relative border border-transparent hover:border-white transition-all duration-300 cursor-default"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedRider(null)}
                className="absolute top-3 right-5 text-red-600 text-7xl hover:text-white font-bold"
              >
                ×
              </button>
              {selectedRider.photo && (
                <img
                  src={selectedRider.photo}
                  alt="Rider"
                  className="w-full h-48 object-cover rounded-t-lg mb-6"
                />
              )}
              <h2 className="text-2xl font-bold mb-4 text-white">
                {selectedRider.fullName}
              </h2>
              {[
                ["Email", selectedRider.email],
                ["Phone", selectedRider.phone],
                ["Region", selectedRider.region],
                ["District", selectedRider.district],
                ["Address", selectedRider.address],
                ["Age", selectedRider.age],
                ["NID", selectedRider.nid],
                ["Vehicle", selectedRider.vehicle],
                ["Experience", selectedRider.experience || "N/A"],
              ].map(([label, value]) => (
                <p className="text-white" key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingRiders;
