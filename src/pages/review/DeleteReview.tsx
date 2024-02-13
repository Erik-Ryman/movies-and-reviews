import { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import API from "@/services/ApiService";

const DeleteReview: NextPage = () => {
  const router = useRouter();
  const { reviewId, movieId, reviewTitle } = router.query;

  const deleteReview = async () => {
    await API.deleteReview(Number(reviewId));
    router.push(`/movie/${movieId}`);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-5 text-2xl font-bold text-gray-300 text-center">
        Are you sure you want to delete {reviewTitle}?
      </h1>
      <div className="flex space-x-4">
        <button
          onClick={deleteReview}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        >
          Yes
        </button>
        <Link
          href={`/movie/${movieId}`}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          No
        </Link>
      </div>
    </div>
  );
};

export default DeleteReview;
