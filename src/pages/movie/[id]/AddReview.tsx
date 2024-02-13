import { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import API from "@/services/ApiService";
import Link from "next/link";

const AddReview: NextPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const movieId = Number(id);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await API.postReview(movieId, {
        name,
        title,
        content,
        rating,
      });
      router.push(`/movie/${movieId}`);
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
            Submit your review
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-6 shadow-md sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={handleNameChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                </div>
              </div>
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
                  htmlFor="content"
                  className="block text-sm font-medium text-white"
                >
                  Content
                </label>
                <div className="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={handleContentChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-white"
                >
                  Rating
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    id="rating"
                    name="rating"
                    required
                    value={rating}
                    onChange={handleRatingChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  value={"Submit review"}
                />
              </div>
              <Link
                href={`/movie/${movieId}`}
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

export default AddReview;
