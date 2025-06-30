// useUserRole.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserRole = (email) => {
  const {
    data: role,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRole", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}users/role/${email}`
      );
      return res.data?.role;
    },
  });

  return { role, isLoading, isError };
};

export default useUserRole;
