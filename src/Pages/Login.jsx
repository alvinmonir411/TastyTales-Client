import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "./../Auth/AuthProvider";
import { BsGoogle } from "react-icons/bs";
import { toast } from "react-toastify";
import lottianimation from "../../src/assets/lottifiles.json";
import Lottie from "react-lottie";

const Login = () => {
  const { handlegooglelogin, user, setuser, handlelogin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // Google login
  const googlelogin = () => {
    handlegooglelogin()
      .then((data) => {
        setuser(data.user);
        toast.success(`Welcome ${data.user?.displayName}`);
        navigate("/");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  // Email/password login
  const handleloginemailpassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.Password.value;

    handlelogin(email, password)
      .then((data) => {
        setuser(data.user);
        toast.success(`Welcome ${data.user?.displayName}`);
        navigate("/");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottianimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <Lottie options={defaultOptions} height={300} width={300} />
          <NavLink to="/" className="btn w-full bg-accent">
            Back to Home
          </NavLink>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleloginemailpassword} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />

              <label className="label">Password</label>
              <input
                type="password"
                name="Password"
                className="input"
                placeholder="Password"
                required
              />

              <div className="flex justify-between items-center text-sm mt-2">
                <NavLink to="#" className="link link-hover text-blue-500">
                  Forgot password?
                </NavLink>
                <NavLink
                  to="/register"
                  className="link link-hover text-blue-500 font-semibold"
                >
                  Register Now
                </NavLink>
              </div>

              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
            </form>
          </div>

          <button
            onClick={googlelogin}
            className="btn btn-neutral bg-white text-black border-[#e5e5e5] m-5 mb-10"
          >
            <BsGoogle className="text-accent" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
