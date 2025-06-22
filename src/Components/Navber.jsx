import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import { use, useContext } from "react";
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import { BiCartAdd } from "react-icons/bi";
import { CardContext } from './../Auth/Cardprover';
import { div } from "framer-motion/client";


const Navber = () => {
  const navigate = useNavigate();
  const { user, setuser, logout } = useContext(AuthContext);

  const Navlinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : ""
          }
          end
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Allrecipe"
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : ""
          }
          end
        >
          All-Recipe
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addrecipes"
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : ""
          }
        >
          Add-Recipes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myrecipes"
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : ""
          }
        >
          My-Recipes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutus"
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : ""
          }
        >
          About-Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : ""
          }
        >
          Blogs
        </NavLink>
      </li>
    </>
  );

  const handlelogout = () => {
    logout()
      .then(() => {
        setuser(null);
        toast.success("You are successfully logged out");
        navigate("/");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };
  // card info 
  const { count } = use(CardContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="navbar sticky top-0  bg-transparent  backdrop-blur-md shadow-lg z-50"
    >
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <GiHamburgerMenu size={20} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {Navlinks}
          </ul>
        </div>

        {/* Logo */}
        <NavLink
          to="/"
          className="btn btn-ghost normal-case text-lg sm:text-xl text-blue-500 font-bold"
        >
          TASTYTALES
        </NavLink>
      </div>

      {/* Desktop NavLinks */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">{Navlinks}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex justify-center items-center gap-5 ">
            {" "}
            {/* Cart Icon */}
            <div className="relative">
              <NavLink to="/mycard">
                <BiCartAdd size={32} className="text-blue-700" />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              </NavLink>
            </div>
            <div className="dropdown dropdown-end flex justify-center items-center gap-5 ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border">
                  <img
                    alt="profile"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-6 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <span className="justify-between">
                    {user?.displayName || "Profile"}
                  </span>
                </li>
                <li>
                  <NavLink to="/dashbord">Dashbord </NavLink>
                </li>
                <li>
                  <button onClick={handlelogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn btn-sm btn-outline">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-sm btn-primary">
              Create Account
            </NavLink>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navber;
