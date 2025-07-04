import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useUpdateDeliveryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }) =>
      axios.patch(
        `${import.meta.env.VITE_URL}orders/update-status/${orderId}`,
        { status }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["riderOrders"] });
    },
  });
};

export default useUpdateDeliveryStatus;
