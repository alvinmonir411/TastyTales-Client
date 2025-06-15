import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext } from "react";
import { toast } from "react-toastify";

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
  const { user,setuser, logout } = useContext(AuthContext);
  const handlelogout = ()=>{
    console.log('btn cliked')
    logout()
      .then((result) => {
        setuser(null)
        toast.success('your Are succesfully Logout')
      })
      .catch((error) => {
       toast.error('some problem')
      });
      
  }
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
        <a className="btn text-blue-500 font-semibold text-xl">TASTYTALES</a>
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
                  alt="profile Image"
                  src={
                    user? user.photoURL :
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  {user?.displayName || Profile}
                  <span className="badge">New</span>
                </a>
              </li>

              <li>
                <button onClick={handlelogout}>Logout</button>
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
