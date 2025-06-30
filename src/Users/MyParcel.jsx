import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthProvider";

const MyParcel = () => {
  const { user } = useContext(AuthContext);
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_URL}parcels?email=${user.email}`)
        .then((res) => {
          setParcels(res.data);
        })
        .catch((error) => {
          console.error("Error fetching parcel data:", error);
        });
    }
  }, [user?.email]);
  // this is for delete data
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${import.meta.env.VITE_URL}parcle/${id}`).then(() => {
          setParcels(parcels.filter((parcel) => parcel._id !== id));
          Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto p-4">
      <motion.h2
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Parcels
      </motion.h2>

      <motion.table
        className="table w-full border text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>Tracking ID</th>
            <th>Title</th>
            <th>Weight</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <motion.tr
              key={parcel._id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="hover:bg-gray-50 border-b"
            >
              <td>{parcel.tracking_id}</td>
              <td>{parcel.title}</td>
              <td>{parcel.weight || "N/A"} kg</td>
              <td>
                {parcel.sender_district}, {parcel.sender_region}
              </td>
              <td>
                {parcel.receiver_district}, {parcel.receiver_region}
              </td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-white text-xs ${
                    parcel.delivery_status === "pending"
                      ? "bg-orange-500"
                      : "bg-green-600"
                  }`}
                >
                  {parcel.delivery_status}
                </span>
              </td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-white text-xs ${
                    parcel.payment_status === "unpaid"
                      ? "bg-red-500"
                      : "bg-green-600"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="flex gap-2">
                <button className="btn btn-xs btn-info">Edit</button>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(parcel._id)}
                >
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default MyParcel;
