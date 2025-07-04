import { createBrowserRouter } from "react-router";
import Root from "./../Root/Root";
import Home from "./../Root/Home/Home";
import PrivateRoute from "./../PrivetRoute/PrivetRout";
import AddParcel from "../Users/Addpercel";
import AddRecipe from "./../Pages/AddRecipe";
import Allrecipe from "./../Pages/Allrecipe";
import Deteils from "./../Components/Deteils";
import BuyNow from "./../Pages/BuyNow";
import Mycard from "./../Pages/Mycard";
import AboutUs from "./../Components/AboutUs";
import BigBlog from "./../Components/BigBlog.";
import Login from "./../Pages/Login";
import Register from "./../Pages/Register";

import DashbordHome from "./../admin/DashbordHome";
import Allparcle from "./../admin/Allparcle";
import Totalrecipes from "./../admin/Totalrecipes";
import MyParcel from "./../Users/MyParcel";
import Myorder from "./../Users/Myorder";
import BeARider from "./../Rider/BeARider";
import AdminRoute from "./../PrivetRoute/AdminRoute";
import PendingRiders from "./../admin/PendingRiders";
import MakeAdmin from "./../admin/MakeAdmin";
import Myrecipe from "./../Components/Myrecipe";
import Admin from "../admin/Admin";
import axiosSecure from "./../axiosSecure";
import OrderTable from "../admin/OrderTable";
import RiderOrdersTable from "../Rider/RiderOrdersTable";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "addrecipes",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },

      {
        path: "Allrecipe",
        Component: Allrecipe,
      },
      {
        path: "recipedeteils/:id",
        Component: Deteils,
      },
      {
        path: "buynow/:id",
        Component: BuyNow,
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "mycard",
        Component: Mycard,
      },
      {
        path: "AboutUs",
        Component: AboutUs,
      },
      {
        path: "blogs",
        Component: BigBlog,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashbord",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <DashbordHome />,
      },
      {
        path: "dashbord",
        Component: DashbordHome,
      },
      {
        path: "Addpercel",
        Component: AddParcel,
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "AllParcel",
        Component: Allparcle,
      },
      {
        path: "riderOrdersTable",
        Component: RiderOrdersTable,
      },
      {
        path: "myrecipes",
        element: (
          <PrivateRoute>
            <Myrecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "totalRecipes",
        element: <Totalrecipes />,
      },

      {
        path: "myparcle",
        Component: MyParcel,
      },
      {
        path: "myorder",
        Component: Myorder,
      },
      {
        path: "beARider",
        loader: () => fetch("/warehouses.json"),
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
      },
      {
        path: "pendingRiders",

        element: (
          <PrivateRoute>
            <AdminRoute>
              <PendingRiders />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "makeAdmin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              {" "}
              <MakeAdmin />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "orderTable",

        element: (
          <PrivateRoute>
            <AdminRoute>
              <OrderTable />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
