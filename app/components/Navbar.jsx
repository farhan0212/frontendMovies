"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import AddMovieModal from "./AddMovieForm.jsx";
import Image from "next/image";
import Link from "next/link.js";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddMovieSuccess = () => {
    setSuccessMessage("Movie added successfully!");
    setTimeout(() => {
      setSuccessMessage("");
      handleCloseModal();
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <header className="flex justify-between items-center bg-gradient-to-b from-gray-950 to-slate-800 p-4">
        <div className="flex items-center">
          <Link href="/">
            <Image
              className="w-32 h-auto ml-4"
              src="/Logo.png"
              alt="Logo"
              width={128}
              height={64}
            />
          </Link>
        </div>
        <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <button
            onClick={handleShowModal}
            className="flex items-center px-4 py-2 rounded-lg bg-slate-500
            text-white hover:bg-gray-600 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 2a.75.75 0 00-.75.75v6.5H2a.75.75 0 000 1.5h7.25v6.5a.75.75 0 001.5 0v-6.5H18a.75.75 0 000-1.5H10V2zm6.5 16.75a.75.75 0 111.5 0v-6.5h6.5a.75.75 0 110 1.5h-6.5v6.5z"
                clipRule="evenodd"
              />
            </svg>
            Add
          </button>
        </motion.div>
      </header>
      {showModal && (
        <AddMovieModal
          showModal={showModal}
          closeModal={handleCloseModal}
          onSuccess={handleAddMovieSuccess}
        />
      )}
      {successMessage && (
        <div className="bg-green-500 text-white p-4">{successMessage}</div>
      )}
    </>
  );
};

export default Navbar;
