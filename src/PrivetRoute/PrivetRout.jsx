import React, { use } from 'react'
import { AuthContext } from '../Auth/AuthProvider'
import { Navigate, useLocation } from 'react-router';
import { form } from 'framer-motion/client';

const PrivetRout = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation()
  if (loading) {
    return <p>loading ....</p>;
  }
  if (user) {
    return children

  }

  return <Navigate to="/login" state={{form:location}} replace></Navigate>


  return <div></div>;
};

export default PrivetRout
