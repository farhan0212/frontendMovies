import React from "react";
import Navbar from "./components/Navbar";
import MovieList from "./components/movieList";

export default function Home() {
  return (
    <>
      <Navbar />
      <MovieList />
    </>
  );
}
