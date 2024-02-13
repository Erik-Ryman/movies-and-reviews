"use client";

import React, { FC, useEffect, useState } from "react";
import RenderReviews from "./components/RenderReviews";
import API, { Review } from "@/services/ApiService";

interface GetReviewsProps {
  movieId: number;
}

const GetReviews: FC<GetReviewsProps> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await API.getMovieById(movieId);

        setReviews(data.reviews);
      } catch (error) {
        setError((error as Error).message);
      }
    }
    fetchData();
  }, [movieId]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return <RenderReviews reviews={reviews} />;
};

export default GetReviews;
