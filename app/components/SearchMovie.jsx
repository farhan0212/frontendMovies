"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { searchMovies } from "../api/api";

const SearchMovies = ({ setMovies }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const results = await searchMovies(query);
      setMovies(results.data);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <motion.div
        className="box"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        <input
          type="text"
          placeholder="Search movie titles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-slate-600 text-white rounded-r-lg hover:bg-blue-700 transition duration-300">
          Search
        </button>
      </motion.div>
    </div>
  );
};

export default SearchMovies;
