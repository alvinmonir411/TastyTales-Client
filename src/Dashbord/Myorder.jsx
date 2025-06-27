import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Auth/AuthProvider";
import { motion } from "framer-motion";

const Myorder = () => {
  const { user } = useContext(AuthContext);
  const [myOrder, setMyOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios(`${import.meta.env.VITE_URL}orders?email=${user.email}`)
      .then((res) => {
        setMyOrder(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
        setError("Failed to load orders.");
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="text-center text-red-500 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="px-4 py-8 md:px-10 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-neutral">
        🧾 Your Orders
      </h2>

      {myOrder.length === 0 ? (
        <motion.p
          className="text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          You haven’t placed any orders yet.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myOrder.map((order, index) => (
            <motion.div
              key={order._id}
              className="card bg-base-100 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="card-body p-5">
                <h3 className="text-xl font-semibold text-primary mb-1">
                  {order.title}
                </h3>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Quantity:</span>{" "}
                    {order.quantity}
                  </p>
                  <p>
                    <span className="font-semibold">Price (each):</span> $
                    {order.price.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery Fee:</span> ৳
                    {order.deliveryCharge}
                  </p>
                  <p>
                    <span className="font-semibold">Total Paid:</span>{" "}
                    <span className="text-green-600 font-bold">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span
                      className={`badge px-3 py-1 text-white ${
                        order.paymentStatus === "succeeded"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 text-right">
                    Paid at:
                    <br />
                    {new Date(order.paidAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Myorder;
