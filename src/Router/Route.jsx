import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddRecipe from "../Pages/AddRecipe";
import PrivetRout from "../PrivetRoute/PrivetRout";
import Allrecipe from "../Pages/Allrecipe";
import Home from "./../Root/Home/Home";
import Admin from "../Dashbord/admin";
import DashbordHome from "../Dashbord/DashbordHome";
import Deteils from "../Components/Deteils";
import BuyNow from "../Pages/BuyNow";
import Mycard from "../Pages/Mycard";
import Addpercel from "../Pages/Dashbord/Addpercel";
import Allparcle from "../Dashbord/Card/Allparcle";
import MyParcel from "../Dashbord/Card/MyParcel";
import AboutUs from "../Components/AboutUs";
import BigBlog from "./../Components/BigBlog.";
import Myorder from "../Dashbord/Myorder";
import Myrecipe from "../Components/Myrecipe";
import Totalrecipes from "../Dashbord/Totalrecipes";
import PrivateRoute from "../PrivetRoute/PrivetRout";
import BeARider from "../Pages/BeARider";
import PendingRiders from "../Pages/Dashbord/PendingRiders";

// import MyParcel from "../Dashbord/Card/MyParcel";

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
          <PrivetRout>
            <AddRecipe />
          </PrivetRout>
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
        Component: Addpercel,
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "AllParcel",
        Component: Allparcle,
        loader: () => fetch(`${import.meta.env.VITE_URL}parcels`),
      },

      {
        path: "myrecipes",
        element: (
          <PrivetRout>
            <Myrecipe />
          </PrivetRout>
        ),
      },
      {
        path: "totalRecipes",
        element: (
          <PrivetRout>
            <Totalrecipes />
          </PrivetRout>
        ),
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
            <PendingRiders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
