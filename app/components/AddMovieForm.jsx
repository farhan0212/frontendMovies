import React, { useState } from "react";
import { addMovie } from "../api/api";

const AddMovieModal = ({ showModal, closeModal }) => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [rating, setRating] = useState("");
  const [sutradara, setSutradara] = useState("");
  const [foto, setFoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("rating", rating);
    formData.append("sutradara", sutradara);
    formData.append("image", foto);

    try {
      const data = await addMovie(formData);
      console.log("Success:", data);
      setJudul("");
      setDeskripsi("");
      setRating("");
      setSutradara("");
      setFoto(null);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${
        showModal ? "" : "hidden"
      }`}>
      <div className="bg-slate-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Add New Movie
        </h2>
        <form className="grid" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Judul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="input-field placeholder-gray-500 border-blue-100 rounded-md py-2 px-4 mb-4"
          />
          <input
            type="text"
            placeholder="Deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="input-field  placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-500 rounded-md py-2 px-4 mb-4"
          />
          <input
            type="text"
            placeholder="Sutradara"
            value={sutradara}
            onChange={(e) => setSutradara(e.target.value)}
            className="input-field  placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-500 rounded-md py-2 px-4 mb-4"
          />
          <div className="flex justify-between items-center bg-white w-full rounded-lg p-2 mb-2 mr-4">
            <div className=" text-gray-500 text-center font-light text-lg pl-2">
              Rating
            </div>
            <span className="rating mb-2">
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
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="input-field mb-4"
          />
          <button
            type="submit"
            className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
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

export default AddMovieModal;
