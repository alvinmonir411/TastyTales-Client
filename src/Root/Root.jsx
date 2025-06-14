import React from "react";
import Navber from "./../Components/Navber";
import { Outlet } from "react-router";
const Root = () => {
  return (
    <div>
      <Navber />
      <Outlet />
    </div>
  );
};

export default Root;
