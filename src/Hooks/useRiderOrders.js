import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRiderOrders = (riderId) => {
  return useQuery({
    queryKey: ["riderOrders", riderId],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}api/orders/rider/${riderId}`
      );
      return res.data;
    },
    enabled: !!riderId,
  });
};

export default useRiderOrders;
