import { Review } from "@/services/ApiService";
import Link from "next/link";
import React, { Fragment } from "react";
import { HiOutlinePencilAlt, HiOutlineX } from "react-icons/hi";

interface ReviewProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="bg-white shadow rounded-lg p-2 mb-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col sm:flex-row">
      <div className="w-full sm:w-[20%] flex flex-col justify-center items-center">
        <h2 className="text-xl text-center font-semibold mb-2 overflow-hidden">
          {review.title}
        </h2>
        <span className="text-gray-200">{review.name}</span>
      </div>
      <div className="w-full sm:w-[10%] flex flex-col justify-center items-center">
        <span className="text-gray-200">Rating</span>

        <span
          className={`px-2 py-1 rounded ${
            review.rating >= 4
              ? "bg-green-500"
              : review.rating >= 2
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {review.rating}
        </span>
      </div>
      <div className="w-full sm:w-[60%] flex justify-center items-center">
        <p className="text-gray-200 overflow-wrap-break-word">
          {review.content}
        </p>
      </div>
      <div className="w-full sm:w-auto flex flex-col justify-center items-center">
        <Link
          href={`/review/${review.reviewId}`}
          id={review.reviewId.toString()}
          className="flex items-center px-3 py-2 mt-5 text-sm font-medium text-center text-black bg-yellow-500 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        >
          <HiOutlinePencilAlt />
        </Link>
        <Link
          href={{
            pathname: `/review/DeleteReview`,
            query: {
              reviewId: Number(review.reviewId),
              movieId: Number(review.movieId),
              reviewTitle: review.title,
            },
          }}
          className="flex items-center px-3 py-2 mt-5 text-sm font-medium text-center text-black bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <HiOutlineX />
        </Link>
      </div>
    </div>
  );
};

interface RenderReviewsProps {
  reviews: Review[];
}

const RenderReviews: React.FC<RenderReviewsProps> = ({ reviews }) => {
  return (
    <div className="container mx-auto px-4 mt-4">
      {reviews.map((review) => (
        <Fragment key={review.reviewId}>
          <ReviewCard review={review} />
        </Fragment>
      ))}
    </div>
  );
};

export default RenderReviews;
