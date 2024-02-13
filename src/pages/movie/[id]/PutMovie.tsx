"use client";
import Header from "@/components/Header";
import API from "@/services/ApiService";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

export const PutMovie: NextPage = () => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const router = useRouter();
  const movieId = router.query.movieId;

  useEffect(() => {
    const fetchMovie = async () => {
      const fetchedMovie = await API.getMovieById(Number(movieId));
      setTitle(fetchedMovie.title);
      setDirector(fetchedMovie.director);
      setYear(fetchedMovie.year);
    };

    fetchMovie();
  }, [movieId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDirectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirector(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await API.putMovie(Number(movieId), {
        year,
        title,
        director,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Edit {title}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-6 shadow-md sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-white"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="director"
                  className="block text-sm font-medium text-white"
                >
                  Director
                </label>
                <div className="mt-1">
                  <input
                    id="director"
                    name="director"
                    required
                    value={director}
                    onChange={handleDirectorChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-white"
                >
                  Year
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="year"
                    name="year"
                    required
                    min="1889"
                    max="3000"
                    value={year}
                    onChange={handleYearChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <input
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  value={"Save changes"}
                />
              </div>
              <Link
                href={`/`}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PutMovie;
