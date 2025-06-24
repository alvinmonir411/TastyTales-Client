import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddRecipe from "../Pages/AddRecipe";
import PrivetRout from "../PrivetRoute/PrivetRout";
import Allrecipe from "../Pages/Allrecipe";
import Home from './../Root/Home/Home';
import Admin from "../Dashbord/admin";
import DashbordHome from "../Dashbord/DashbordHome";
import Deteils from "../Components/Deteils";
import BuyNow from "../Pages/BuyNow";
import Mycard from "../Pages/Mycard";
import Addpercel from "../Pages/Dashbord/Addpercel";
import Allparcle from "../Dashbord/Card/Allparcle";
import MyParcel from "../Dashbord/Card/MyParcel";
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
        path: "myparcle",
        Component: MyParcel,
      },
    ],
  },
]);
