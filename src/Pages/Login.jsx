import React, { useContext, useState } from "react";
import { BsGoogle } from "react-icons/bs";

import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../Auth/AuthProvider";

const Login = () => {
  const { handlegooglelogin, setuser, handleloginwitheamil } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleEmailLoginSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    handleloginwitheamil(email, password)
      .then((data) => {
        const user = data.user;
        setuser(user);

        // Save user to MongoDB
        const userInfo = {
          name: user.displayName || "",
          email: user.email,
          photoURL: user.photoURL || "",
          role: "user",
        };

        axios
          .post(`${import.meta.env.VITE_URL}users`, userInfo)
          .then(() => {
            toast.success(
              `Welcome back${user.displayName ? `, ${user.displayName}` : ""}!`
            );
            navigate("/");
          })
          .catch(() => {
            toast.error("Failed to save user to database");
          });
      })
      .catch(() => {
        toast.error("Invalid email or password");
      })
      .finally(() => setLoading(false));
  };

  const googlelogin = () => {
    handlegooglelogin()
      .then((data) => {
        const user = data.user;
        setuser(user);

        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
        };

        axios
          .post(`${import.meta.env.VITE_URL}users`, userInfo)
          .then(() => {
            toast.success(`Welcome ${user.displayName}`);
            navigate("/");
          })
          .catch(() => {
            toast.error("Failed to save user to database");
          });
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6b8dd6 100%)",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-10 max-w-md w-full text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1
          className="text-4xl font-extrabold mb-8"
          style={{
            background: "linear-gradient(90deg, #f7971e, #ffd200, #f7971e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          Login to Your Account
        </h1>

        {/* Email/Password Login Form */}
        <form onSubmit={handleEmailLoginSubmit} className="space-y-5 text-left">
          <div>
            <label className="block mb-1 font-semibold text-white">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider text-white mt-6">OR</div>

        {/* Google Login Button */}
        <button
          onClick={googlelogin}
          className="flex items-center justify-center gap-3 w-full py-3 rounded-md font-semibold"
          style={{
            background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
            color: "white",
            boxShadow: "0 4px 15px 0 rgba(255, 75, 43, 0.5)",
            transition: "box-shadow 0.3s ease",
          }}
          whileHover={{ boxShadow: "0 6px 20px 0 rgba(255, 75, 43, 0.7)" }}
        >
          <BsGoogle size={24} />
          Login with Google
        </button>

        <p className="mt-6 text-white">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-yellow-300 underline">
            Register here
          </NavLink>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
