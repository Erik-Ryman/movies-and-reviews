import GetReviews from "@/pages/review/GetReviews";
import Header from "@/components/Header";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Movie: NextPage = () => {
  const router = useRouter();
  const { id, title } = router.query;
  if (id === undefined) {
    return <h1>Nothing to see here...</h1>;
  }

  return (
    <>
      <Header />
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mt-8 mb-8">
        Reviews for {title}
      </h1>
      <GetReviews movieId={Number(id)} />
      <Link
        href={{
          pathname: `/movie/${id}/AddReview`,
          query: { movieId: Number(id) },
        }}
        className="w-32 flex items-center px-3 py-2 mt-5 mb-5 mx-auto text-sm font-medium text-center rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add a review
      </Link>
    </>
  );
};

export default Movie;
