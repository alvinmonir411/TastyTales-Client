import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";
import { FaUserPlus, FaTimesCircle } from "react-icons/fa";

const OrderTable = () => {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}orders`);
      return res.data;
    },
  });

  // Fetch riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}riders`);
      return res.data;
    },
  });

  // Assign rider mutation
  const assignRiderMutation = useMutation({
    mutationFn: async ({ orderId, riderId }) => {
      return await axios.patch(
        `${import.meta.env.VITE_URL}orders/assign-rider/${orderId}`,
        {
          riderId,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      setIsModalOpen(false);
    },
  });

  // Cancel order mutation
  const cancelOrderMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`${import.meta.env.VITE_URL}orders/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading orders...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 overflow-x-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Orders Table</h2>

      <table className="table table-zebra w-full text-sm">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Buyer</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Payment</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.title}</td>
              <td>{order.buyerInfo?.name}</td>
              <td>{order.buyerInfo?.phone}</td>
              <td>{order.buyerInfo?.address}</td>
              <td>${parseFloat(order.totalPrice).toFixed(2)}</td>
              <td className="capitalize text-success">{order.paymentStatus}</td>
              <td className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsModalOpen(true);
                  }}
                  className="btn btn-sm btn-primary tooltip"
                  data-tip="Assign Rider"
                >
                  <FaUserPlus />
                </button>
                <button
                  onClick={() => cancelOrderMutation.mutate(order._id)}
                  className="btn btn-sm btn-error tooltip"
                  data-tip="Cancel Order"
                >
                  <FaTimesCircle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Rider Modal */}
      {isModalOpen && selectedOrder && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Assign Rider</h3>
            <p className="text-sm mb-4">
              Matching for region: <b>{selectedOrder.buyerInfo.region}</b> or
              district: <b>{selectedOrder.buyerInfo.district}</b>
            </p>

            <select
              className="select select-bordered w-full"
              disabled={assignRiderMutation.isPending}
              onChange={(e) => {
                const riderId = e.target.value;
                assignRiderMutation.mutate({
                  orderId: selectedOrder._id,
                  riderId,
                });
              }}
            >
              <option disabled selected>
                Select a rider
              </option>
              {riders
                .filter(
                  (r) =>
                    r.region === selectedOrder.buyerInfo.region ||
                    r.district === selectedOrder.buyerInfo.district
                )
                .map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.fullName} ({r.district}, {r.region})
                  </option>
                ))}
            </select>

            <div className="modal-action">
              <button
                className="btn btn-sm"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </motion.div>
  );
};

export default OrderTable;
