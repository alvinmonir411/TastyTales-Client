import React from "react";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaUtensils,
  FaUsers,
  FaFireAlt,
  FaHeart,
  FaSeedling,
  FaHandsHelping,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-16 px-4 md:px-20 text-gray-800">
      {/* Header */}
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-extrabold text-orange-600 mb-4">
          About Tasty Tales
        </h2>
        <p className="text-lg text-gray-600">
          At Tasty Tales, we believe every dish tells a story. Our platform
          connects food lovers, home chefs, and professional sellers to explore
          and share the passion of cooking across cultures.
        </p>
      </motion.div>

      {/* Why Tasty Tales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 items-center">
        <motion.div
          className="w-full h-full flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://i.ibb.co/ZVh01dm/food-sharing.png"
            alt="Food sharing"
            className="w-full max-w-lg rounded-xl shadow-lg"
          />
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-semibold text-orange-500">
            What Makes Us Unique?
          </h3>
          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <FaFireAlt className="text-orange-500 text-xl mt-1" />
              <span>
                <strong>Culinary Diversity:</strong> Discover recipes from all
                around the world, shared with love and tradition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaSeedling className="text-orange-500 text-xl mt-1" />
              <span>
                <strong>Grow with Us:</strong> Home chefs and sellers can build
                an audience and showcase their culinary talent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaHeart className="text-orange-500 text-xl mt-1" />
              <span>
                <strong>Community Love:</strong> Save recipes, share
                experiences, and rate your favorite dishes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaHandsHelping className="text-orange-500 text-xl mt-1" />
              <span>
                <strong>Supportive Ecosystem:</strong> Whether you cook, create,
                or manage — Tasty Tales is for everyone.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Role Highlights */}
      <div className="mt-20">
        <h3 className="text-3xl font-bold text-center text-orange-600 mb-12">
          Our Community Roles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* User */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-orange-200"
          >
            <FaUsers className="text-5xl text-orange-500 mx-auto mb-4" />
            <h4 className="text-2xl font-semibold mb-2">Users</h4>
            <p className="text-gray-600">
              Browse, save, and share recipes. Join a growing food-loving
              community where taste meets tradition.
            </p>
          </motion.div>

          {/* Seller */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-orange-200"
          >
            <FaUtensils className="text-5xl text-orange-500 mx-auto mb-4" />
            <h4 className="text-2xl font-semibold mb-2">Sellers</h4>
            <p className="text-gray-600">
              Upload your best recipes, manage your food catalog, and build a
              loyal following of recipe lovers.
            </p>
          </motion.div>

          {/* Admin */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-orange-200"
          >
            <FaUserShield className="text-5xl text-orange-500 mx-auto mb-4" />
            <h4 className="text-2xl font-semibold mb-2">Admins</h4>
            <p className="text-gray-600">
              Oversee user activity, approve sellers, and maintain a safe,
              respectful, and delicious experience for all.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Closing CTA */}
      <motion.div
        className="mt-24 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h4 className="text-2xl font-semibold text-orange-600 mb-4">
          Be Part of Our Story
        </h4>
        <p className="text-gray-700">
          Tasty Tales is more than a recipe site — it's a celebration of
          culture, connection, and creativity. Whether you’re here to learn,
          share, or lead — welcome to the family.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutUs;
