import React, { use } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../Auth/AuthProvider";
import useUserRole from "../Hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  const { role, isLoading: roleLoading } = useUserRole(user?.email);

  if (loading || roleLoading) {
    return <div className="text-center text-lg mt-10">Loading...</div>;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
