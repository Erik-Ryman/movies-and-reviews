import router from "next/router";

export const API_URL = "https://localhost:7009/";

export const ENDPOINTS = {
  LOGIN: `${API_URL}login`,
  REGISTER: `${API_URL}register`,
  REFRESH: `${API_URL}refresh`,
  USER_INFO: `${API_URL}manage/info`,
  GET_ALL_MOVIES: `${API_URL}api/movies`,
  GET_MOVIE_BY_ID: `${API_URL}api/movies/`,
  POST_MOVIE: `${API_URL}api/movies/`,
  DELETE_MOVIE: `${API_URL}api/movies/`,
  PUT_MOVIE: `${API_URL}api/movies/`,
  GET_ALL_REVIEWS: `${API_URL}api/reviews`,
  GET_REVIEW_BY_ID: `${API_URL}api/reviews/`,
  POST_REVIEW: `${API_URL}api/reviews/`,
  DELETE_REVIEW: `${API_URL}api/reviews/`,
  PUT_REVIEW: `${API_URL}api/reviews/`,
};

export interface Movie {
  movieId: number;
  title: string;
  director: string;
  year: number;
  reviews: [];
}

export interface Review {
  reviewId: number;
  name: string;
  title: string;
  content: string;
  rating: number;
  movieId: number;
  movie: Movie;
  reviewerId: number;
  reviewer: any;
}

export interface ReviewDTO {
  name: string;
  title: string;
  content: string;
  rating: number;
}

export interface MovieDTO {
  title: string;
  director: string;
  year: number;
}

const API = {
  async getAllMovies(): Promise<Movie[]> {
    const response = await fetch(ENDPOINTS.GET_ALL_MOVIES);
    return await response.json();
  },

  async getMovieById(movieId: number): Promise<Movie> {
    const response = await fetch(ENDPOINTS.GET_MOVIE_BY_ID + movieId);
    return await response.json();
  },

  async getReviews(): Promise<Review[]> {
    const response = await fetch(ENDPOINTS.GET_ALL_REVIEWS);
    return await response.json();
  },

  async postMovie(movie: MovieDTO) {
    const token = await AUTH.getAccessToken();
    await fetch(ENDPOINTS.POST_MOVIE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
    });
  },

  async putMovie(movieId: number, movie: MovieDTO) {
    const token = await AUTH.getAccessToken();
    await fetch(ENDPOINTS.PUT_MOVIE + movieId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
    });
  },

  async deleteMovie(movieId: number) {
    const token = await AUTH.getAccessToken();
    await fetch(ENDPOINTS.DELETE_MOVIE + movieId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getReviewById(reviewId: number): Promise<Review> {
    const response = await fetch(ENDPOINTS.GET_REVIEW_BY_ID + reviewId);
    return await response.json();
  },

  async postReview(movieId: number, review: ReviewDTO) {
    const token = await AUTH.getAccessToken();
    await fetch(ENDPOINTS.POST_REVIEW + movieId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    });
  },

  async putReview(reviewId: number, review: ReviewDTO) {
    const token = await AUTH.getAccessToken();
    await fetch(ENDPOINTS.PUT_REVIEW + reviewId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    });
  },

  async deleteReview(reviewId: number) {
    const token = await AUTH.getAccessToken();
    await fetch(ENDPOINTS.DELETE_REVIEW + reviewId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const AUTH = {
  async authenticateUser(email: string, password: string) {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  },
  //  -------------------------------------------------------------
  async getUserInfo() {
    const accessToken = await AUTH.getAccessToken();

    const response = await fetch(ENDPOINTS.USER_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  },

  async refreshAccessToken(refreshToken: string) {
    const response = await fetch(ENDPOINTS.REFRESH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    return response.json();
  },

  async getAccessToken() {
    const accessToken = localStorage.getItem("accessToken");
    const expiration = localStorage.getItem("expiration");

    if (accessToken && Number(expiration) > Date.now()) {
      return accessToken;
    }

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("Logged out");
    }

    const response = await AUTH.refreshAccessToken(refreshToken);

    AUTH.handleAuthResponse(response);

    return response.accessToken;
  },

  async registerUser(email: string, password: string) {
    await fetch(ENDPOINTS.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  },

  handleAuthResponse(response: any) {
    const accessToken = response.accessToken;
    const refreshToken = response.refreshToken;
    const expiration = Date.now() + response.expiresIn * 1000;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("expiration", String(expiration));
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiration");

    router.push("/login");
  },
};

export default API;
