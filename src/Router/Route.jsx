import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddRecipe from "../Pages/AddRecipe";
import PrivetRout from "../PrivetRoute/PrivetRout";
import Allrecipe from "../Pages/Allrecipe";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "addrecipes",
        element: <PrivetRout>
<AddRecipe/>
</PrivetRout>,
      },
      {
        path: "Allrecipe",
        Component:Allrecipe
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
]);
