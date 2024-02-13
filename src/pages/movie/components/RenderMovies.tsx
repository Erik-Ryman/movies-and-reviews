import React, { FC } from "react";
import Link from "next/link";
import Rating from "./Rating";
import { Movie } from "@/services/ApiService";
import { HiOutlinePencilAlt, HiOutlineX } from "react-icons/hi";

interface RenderMoviesProps {
  movie: Movie;
}

const RenderMovies: FC<RenderMoviesProps> = ({ movie }) => {
  const reviews = movie.reviews;

  return (
    <div className="max-w-sm min-w-72 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {movie.title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {movie.director}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {movie.year}
      </p>
      {reviews.length == 0 ? "N/A" : <Rating reviews={reviews} />}
      <div className="flex gap-2">
        <Link
          href={{
            pathname: `/movie/${movie.movieId}`,
            query: { title: movie.title },
          }}
          id={movie.movieId.toString()}
          className="w-32 flex items-center px-3 py-2 mt-5 text-sm font-medium text-center rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          See reviews
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        <Link
          href={{
            pathname: `/movie/${movie.movieId}/PutMovie`,
            query: { movieId: movie.movieId },
          }}
          id={movie.movieId.toString()}
          className="flex items-center px-3 py-2 mt-5 text-sm font-medium text-center text-black bg-yellow-500 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        >
          <HiOutlinePencilAlt />
        </Link>
        <Link
          href={{
            pathname: `/movie/${movie.movieId}/DeleteMovie`,
            query: { movieId: movie.movieId, movieTitle: movie.title },
          }}
          id={movie.movieId.toString()}
          className="flex items-center px-3 py-2 mt-5 text-sm font-medium text-center text-black bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          {" "}
          <HiOutlineX />
        </Link>
      </div>
    </div>
  );
};

export default RenderMovies;
