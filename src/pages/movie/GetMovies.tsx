"use client";
import Link from "next/link";
import API, { Movie } from "../../services/ApiService";
import RenderMovies from "./components/RenderMovies";
import { useEffect, useState } from "react";

const GetMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await API.getAllMovies();
        setMovies(data);
      } catch (error) {
        setError((error as Error).message);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section className="w-screen">
      <div className="w-[80%] m-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mt-8 mb-8">
          Movies
        </h1>
        <div className="flex flex-wrap gap-4 sm:min-w-0 sm:justify-center justify-center">
          {movies.map((movie) => (
            <RenderMovies key={movie.movieId} movie={movie} />
          ))}
        </div>
        <Link
          href={`/movie/AddMovie`}
          className="w-32 flex items-center px-3 py-2 mt-5 mb-5 mx-auto text-sm font-medium text-center rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add a movie
        </Link>
      </div>
    </section>
  );
};

export default GetMovies;
