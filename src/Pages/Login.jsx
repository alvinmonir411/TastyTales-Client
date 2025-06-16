import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from './../Auth/AuthProvider';
import { BsGoogle } from 'react-icons/bs';
import { toast } from "react-toastify";

const Login = () =>
{
  const { handlegooglelogin, user, setuser, handlelogin } = use(AuthContext);
  // google login
  const navigate = useNavigate()
    const googlelogin = () => {
      handlegooglelogin()
        .then(data => {
          setuser(data.user)
          toast.success(`welcome ${data.user?.displayName}`);
          navigate('/')
        })
        .catch(error => {
        toast.error('something went log')
      })
  };
  // login emailpassword
  const handleloginemailpassword = (e) => {
    e.preventDefault();
    const email= e.target.email.value;
    const password = e.target.Password.value;

    handlelogin(email, password)
      .then((data) => {
        setuser(data.user);
        toast.success(`welcome ${data.user?.displayName}`);
        navigate("/");
      })
      .catch((error) => {
        toast.error("something went log");
      });
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <NavLink to="/" className="btn bg-accent">
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
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="Password"
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
            </form>
          </div>{" "}
          {/* Google */}
          <button
            onClick={googlelogin}
            className="btn  btn-neutral bg-white text-black border-[#e5e5e5] mb-10"
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
