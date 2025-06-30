import React, { useContext, useState, use } from "react";
import { BsGoogle } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../Auth/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
  const { handlegooglelogin, setuser, handleloginwitheamil } = use(AuthContext);

  const [imgUploading, setImgUploading] = useState(false);

  const handleregister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.Password.value;
    const image = form.Photo_File.files[0];

    if (!image) {
      toast.error("Please upload a photo");
      return;
    }

    try {
      setImgUploading(true);

      // ✅ Upload to ImgBB
      const formData = new FormData();
      formData.append("image", image);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      const photoURL = imgbbRes.data.data.display_url;

      // ✅ Create user with email & password
      const result = await handleloginwitheamil(email, password);
      const user = result.user;

      // ✅ Update profile with name & photo
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      const userInfo = {
        name,
        email: user.email,
        photoURL,
        role: "user",
      };

      setuser({ ...user, displayName: name, photoURL });

      // ✅ Save to MongoDB
      await axios.post(`${import.meta.env.VITE_URL}users`, userInfo);

      toast.success(`Welcome ${name}`);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setImgUploading(false);
    }
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
      className="flex justify-center items-center min-h-screen bg-gray-100 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="card bg-base-100 w-full max-w-sm shadow-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          <form onSubmit={handleregister} className="space-y-3">
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="Password"
                className="input input-bordered w-full"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <label className="label">Upload Photo</label>
              <input
                type="file"
                name="Photo_File"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                required
              />
            </div>

            <div className="flex justify-between text-sm mt-2">
              <a className="link link-hover">Forgot password?</a>
              <NavLink
                to="/login"
                className="link link-hover text-blue-500 font-semibold"
              >
                Log in Here
              </NavLink>
            </div>

            <button
              type="submit"
              className="btn btn-neutral w-full mt-4"
              disabled={imgUploading}
            >
              {imgUploading ? "Uploading..." : "Register"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={googlelogin}
            className="btn bg-white text-black border-[#e5e5e5] w-full flex items-center gap-2 justify-center"
          >
            <BsGoogle className="text-accent" />
            Login with Google
          </button>
        </div>

        <div className="px-5 pb-5">
          <NavLink
            to="/"
            className="btn bg-primary text-primary-content w-full"
          >
            Back to Home
          </NavLink>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
