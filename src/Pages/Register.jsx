import React, { use } from "react";
import { BsGoogle } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";


const Register = () =>
{
  const navigate = useNavigate();
  const { handlegooglelogin, setuser, handleloginwitheamil, updtprofile } =
    use(AuthContext);

  const handleregister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.Password.value;
    const photoUrl = form.Photo_Url.value;

    handleloginwitheamil(email, password)
      .then((data) => {
        const user = data.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            setuser({ ...user, displayName: name, photoURL: photoUrl });
            toast.success(`Welcome ${name}`);
            navigate("/");
          })
          .catch((error) => {
            toast.error("Profile update failed");
            console.log(error.message);
          });
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error.message);
      });
  };

  const googlelogin = () => {
    handlegooglelogin()
      .then((data) => {
        setuser(data.user);
        toast.success(`Welcome ${data.user?.displayName}`);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
  return (
    <div>
      <div className="card mx-auto bg-base-100 mt-10 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleregister} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Your Name"
            />
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="Password"
              className="input"
              placeholder="Password"
            />
            <label className="label">Photo_Url</label>
            <input
              type="url"
              name="Photo_Url"
              className="input"
              placeholder="Photo Url"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>  <NavLink
                                to="/login"
                                className="link link-hover text-blue-500 font-semibold"
                              >
                                log in Here
                              </NavLink>
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </form>

          {/* Google */}
          <button
            onClick={googlelogin}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <BsGoogle className="text-accent" />
            Login with Google
          </button>
        </div>
        <div>
          <NavLink
            to="/"
            className="btn bg-primary text-primary-content mx-auto w-full m-5"
          >
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Register;
