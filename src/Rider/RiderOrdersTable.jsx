import React from "react";
import useRiderOrders from "../Hooks/useRiderOrders";
import useUpdateDeliveryStatus from "../Hooks/useUpdateDeliveryStatus";

const RiderOrdersTable = () => {
  const riderId = "6862a364caf3fa2673e03ba9"; // Replace with dynamic id if available
  const { data: orders = [], isLoading } = useRiderOrders(riderId);
  const { mutate: updateStatus, isLoading: isUpdating } =
    useUpdateDeliveryStatus();

  if (isLoading) return <p>Loading orders...</p>;

  const handleUpdate = (orderId, status) => {
    updateStatus({ orderId, status });
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Assigned Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders assigned.</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Region</th>
              <th>District</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => {
              const status = order.delivery_status;

              return (
                <tr key={order._id}>
                  <td>{order.title}</td>
                  <td>{order.quantity}</td>
                  <td>${Number(order.totalPrice).toFixed(2)}</td>
                  <td>{order.buyerInfo?.region}</td>
                  <td>{order.buyerInfo?.district}</td>
                  <td>{order.buyerInfo?.address}</td>
                  <td>{status}</td>
                  <td className="space-x-2">
                    {status === "Rider Assigned" && (
                      <>
                        <button
                          className="btn btn-sm btn-success"
                          disabled={isUpdating}
                          onClick={() => handleUpdate(order._id, "Picked Up")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          disabled={isUpdating}
                          onClick={() => handleUpdate(order._id, "Cancelled")}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {status === "Picked Up" && (
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={isUpdating}
                        onClick={() => handleUpdate(order._id, "Delivered")}
                      >
                        Delivered
                      </button>
                    )}
                    {(status === "Delivered" || status === "Cancelled") && (
                      <span className="text-xs text-gray-500">{status}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RiderOrdersTable;
