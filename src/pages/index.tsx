import GetMovies from "@/pages/movie/GetMovies";
import Header from "@/components/Header";
import { AUTH } from "@/services/ApiService";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await AUTH.getAccessToken();
        setIsAuthenticated(true);
      } catch (error) {
        router.push("/login");
      }
    }
    fetchData();
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="w-screen mx-auto">
      <Header />
      <GetMovies />
    </main>
  );
};

export default Home;
