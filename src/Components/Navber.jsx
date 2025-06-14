import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext } from "react";

const Navber = () => {
  const Navlinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-500 underline" : ""
        }
        end
      >
        Home
      </NavLink>

      <NavLink
        to="/addrecipes"
        className={({ isActive }) =>
          isActive ? "text-blue-500 underline" : ""
        }
      >
        Add-Recipes
      </NavLink>

      <NavLink
        to="/myrecipes"
        className={({ isActive }) =>
          isActive ? "text-blue-500 underline" : ""
        }
      >
        My-Recipes
      </NavLink>
      <NavLink
        to="/aboutus"
        className={({ isActive }) =>
          isActive ? "text-blue-500 underline" : ""
        }
      >
        About-Us
      </NavLink>
      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          isActive ? "text-blue-500 underline" : ""
        }
      >
        Blogs
      </NavLink>
    </>
  );
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <GiHamburgerMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Navlinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className=" px-1 flex justify-center gap-5">{Navlinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>

              <li>
                <button>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <NavLink to="/login" className="btn ml-3 ">
              Login
            </NavLink>
            <NavLink to="register" className="btn ml-3 ">
              Creat An Account
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navber;
