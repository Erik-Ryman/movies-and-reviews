import { Review } from "@/services/ApiService";
import React, { FC } from "react";

interface RatingProps {
  reviews: [];
}

export const Rating: FC<RatingProps> = ({ reviews }) => {
  const avarageRating =
    reviews.reduce((acc, review: Review) => acc + review.rating, 0) /
    reviews.length;

  return (
    <>
      <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Rating:{" "}
      </span>
      <span
        className={`text-gray-900 px-2 py-1 rounded ${
          avarageRating >= 4
            ? "bg-green-500"
            : avarageRating >= 2
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      >
        {avarageRating.toFixed(1)}
      </span>
    </>
  );
};

export default Rating;
