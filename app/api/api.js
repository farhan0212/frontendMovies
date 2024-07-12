import axios from "axios";

export const getMovies = async () => {
  try {
    const response = await axios.get("http://localhost:5000/");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const addMovie = async (movieData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/movies",
      movieData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/movies/filter/${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching for movies:", error);
    throw error;
  }
};

export const updateMovie = async (id, movieData) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/movies/${id}`,
      movieData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/movies/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
