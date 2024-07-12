"use client";

import React, { useState, useEffect } from "react";
import { getMovies, deleteMovie } from "../api/api";
import EditMovieModal from "./editMovieModal";
import SearchMovies from "./SearchMovie";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [editModalData, setEditModalData] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const moviesData = await getMovies();
      setMovies(moviesData.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  const handleEdit = (movie) => {
    setEditModalData(movie);
    setShowModalEdit(true);
    loadMovies();
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      loadMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <section className="container py-5 mx-auto">
      <TypeAnimation
        className="text-white font-semibold text-2xl"
        sequence={[
          `Nama : Farhan Ramadan \n Nim : 23578002 \n Prodi : Teknik Informatika`,
          1000,
          "",
        ]}
        speed={50}
        style={{ whiteSpace: "pre-line", display: "block" }}
        repeat={Infinity}
      />
      <SearchMovies setMovies={setMovies} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie, i) => (
          <motion.div
            key={i}
            className="flex flex-col rounded-lg overflow-hidden bg-gray-800 shadow-2xl shadow-neutral-700"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            style={{ originX: -1, originY: 1 }}
            transition={{ duration: 0.3 }}>
            <img
              src={movie.foto}
              alt={movie.judul}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {movie.judul}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                Director: {movie.sutradara || "Unknown"}
              </p>
              <div className="flex justify-start ">
                <p className="mr-auto text-white">Rating</p>
                <span className="rating mb-2 flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <input
                      key={value}
                      type="radio"
                      name={`rating-${i}`}
                      className="mask mask-star bg-yellow-500"
                      value={value}
                      checked={movie.rating >= value}
                      readOnly
                    />
                  ))}
                </span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(movie)}
                  className="flex items-center px-4 py-2 rounded-lg bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M2.775 11.42l5.304-5.303L15.24 9.713a.275.275 0 010 .388l-1.953 1.953a.275.275 0 01-.388 0l-5.304-5.304a.275.275 0 01-.098-.184V2.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v4.736a.275.275 0 01-.097.184zM3 13.086V17.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-4.414a.275.275 0 01.097-.184l3.306-3.306a.275.275 0 01.388 0l7.25 7.25a.275.275 0 010 .388l-1.953 1.953a.275.275 0 01-.388 0l-7.25-7.25a.275.275 0 00-.388 0l-3.306 3.306a.275.275 0 01-.097.184z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="flex items-center px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M2.5 6.5a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5zM10 13.5a.5.5 0 01-.5-.5v-7a.5.5 0 011 0v7a.5.5 0 01-.5.5zM7 6.5a.5.5 0 00-.5.5v7a.5.5 0 001 0v-7a.5.5 0 00-.5-.5zM13 6.5a.5.5 0 01-.5.5h-1a.5.5 0 010-1h1a.5.5 0 01.5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {showModalEdit && (
        <EditMovieModal
          showModal={showModalEdit}
          closeModal={() => setShowModalEdit(false)}
          movieData={editModalData}
          reloadMovies={loadMovies}
        />
      )}
    </section>
  );
};

export default MovieList;
