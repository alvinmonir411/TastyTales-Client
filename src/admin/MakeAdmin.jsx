import React, { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import axiosSecure from "../axiosSecure";

const MakeAdmin = () => {
  const [query, setQuery] = useState("");
  const [matchedUsers, setMatchedUsers] = useState([]);

  // Debounced function to reduce API calls
  const fetchUsers = debounce(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setMatchedUsers([]);
      return;
    }

    try {
      const res = await axiosSecure.get(`users/search?q=${searchTerm}`);
      setMatchedUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, 300);

  // Search effect
  useEffect(() => {
    fetchUsers(query);
    return () => fetchUsers.cancel();
  }, [query]);

  // Make admin API call
  const handleMakeAdmin = async (email) => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_URL}users/admin`, {
        email,
      });
      toast.success(`${email} is now an admin`);
      setMatchedUsers((prev) =>
        prev.map((user) =>
          user.email === email ? { ...user, role: "admin" } : user
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to make admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-purple-50 to-rose-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Make Admin Panel
        </h2>

        <input
          type="text"
          placeholder="Search user by email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full mb-6"
        />

        <div className="space-y-4">
          {matchedUsers.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded shadow-sm"
            >
              <div>
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400 italic">
                  Role: {user.role || "user"}
                </p>
              </div>
              <button
                onClick={() => handleMakeAdmin(user.email)}
                disabled={user.role === "admin"}
                className={`${
                  user.role === "admin"
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                } text-white text-sm px-4 py-2 rounded-lg shadow-md transition`}
              >
                {user.role === "admin" ? "Already Admin" : "Make Admin"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MakeAdmin;
