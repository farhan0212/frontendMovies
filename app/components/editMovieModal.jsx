import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { updateMovie } from "../api/api";

const EditMovieModal = ({ showModal, closeModal, movieData, reloadMovies }) => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [rating, setRating] = useState(0);
  const [sutradara, setSutradara] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoURL, setFotoURL] = useState(null);

  useEffect(() => {
    if (movieData) {
      setJudul(movieData.judul || "");
      setDeskripsi(movieData.deskripsi || "");
      setRating(movieData.rating || 0);
      setSutradara(movieData.sutradara || "");
      setFoto(movieData.foto || null);
      if (movieData.foto) {
        setFotoURL(movieData.foto);
      }
    }
  }, [movieData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("rating", rating);
    formData.append("sutradara", sutradara);
    if (foto) {
      formData.append("image", foto);
    }

    console.log("Submitting form data:", formData);

    try {
      const response = await updateMovie(movieData.id, formData);
      console.log("Server response:", response);
      if (response.success) {
        console.log("Movie updated successfully:", response);
        reloadMovies();
        closeModal();
      } else {
        console.error("Failed to update movie:", response.message);
      }
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setFotoURL(URL.createObjectURL(file));
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${
        showModal ? "" : "hidden"
      }`}>
      <div className="bg-slate-500 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">Edit Movie</h2>
        <form className="grid" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Judul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="input-field bg-slate-900 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-500 rounded-md py-2 px-4 mb-4"
          />
          <input
            type="text"
            placeholder="Deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="input-field bg-slate-900 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-500 rounded-md py-2 px-4 mb-4"
          />
          <div className="rating mb-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <input
                key={value}
                type="radio"
                name="rating"
                className="mask mask-star bg-yellow-500"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
              />
            ))}
          </div>
          <input
            type="text"
            placeholder="Sutradara"
            value={sutradara}
            onChange={(e) => setSutradara(e.target.value)}
            className="input-field bg-slate-900 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-500 rounded-md py-2 px-4 mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="input-field"
          />
          {fotoURL && (
            <img src={fotoURL} alt="Preview" className="mt-2 w-40 h-auto" />
          )}
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Submit
          </button>
        </form>

        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300">
          Close
        </button>
      </div>
    </div>
  );
};

EditMovieModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  movieData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    judul: PropTypes.string,
    deskripsi: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sutradara: PropTypes.string,
    foto: PropTypes.string,
  }).isRequired,
  reloadMovies: PropTypes.func.isRequired,
};

export default EditMovieModal;
