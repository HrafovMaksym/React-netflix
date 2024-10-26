import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;
const API_KEY_JWT = process.env.API_KEY_JWT;
export const popularMovies = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      headers: { accept: "application/json" },
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Cannot get popular films",
    });
  }
};
export const ratedMovies = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
      headers: { accept: "application/json" },
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Cannot get rated films",
    });
  }
};
export const trendingMovies = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`,
      headers: { accept: "application/json" },
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Cannot get trending films",
    });
  }
};
export const upComingMovies = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
      headers: { accept: "application/json" },
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Cannot get upcoming films",
    });
  }
};
export const getAllMovies = async (req, res) => {
  try {
    const movieGenres = [
      {
        name: "All Genres",
      },
      {
        id: "28",
        name: "Action",
      },
      {
        id: "12",
        name: "Adventure",
      },
      {
        id: "16",
        name: "Animation",
      },
      {
        id: "35",
        name: "Comedy",
      },
      {
        id: "80",
        name: "Crime",
      },
      {
        id: "99",
        name: "Documentary",
      },
      {
        id: "18",
        name: "Drama",
      },
      {
        id: "10751",
        name: "Family",
      },
      {
        id: "14",
        name: "Fantasy",
      },
      {
        id: "36",
        name: "History",
      },
      {
        id: "27",
        name: "Horror",
      },
      {
        id: "10402",
        name: "Music",
      },
      {
        id: "9648",
        name: "Mystery",
      },
      {
        id: "10749",
        name: "Romance",
      },
      {
        id: "878",
        name: "Science Fiction",
      },
      {
        id: "10770",
        name: "TV Movie",
      },
      {
        id: "53",
        name: "Thriller",
      },
      {
        id: "10752",
        name: "War",
      },
      {
        id: "37",
        name: "Western",
      },
    ];
    const { page = 1 } = req.query;

    const { genres = "All Genres" } = req.query;
    const { sort = "" } = req.query;

    const genre = movieGenres.find((el) => el.name === genres);
    const genreParams = genre.id;
    if (genre) {
      const options = {
        method: "GET",
        url:
          genre.name === "All Genres"
            ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=${sort}`
            : `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreParams}&sort_by=${sort}`,
        headers: { accept: "application/json", Authorization: API_KEY_JWT },
      };

      const response = await axios.request(options);
      res.json(response.data);
    } else {
      res.status(404).json({ success: false, message: "404 Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "500 Internal Server Error",
    });
  }
};

export const getTvShows = async (req, res) => {
  try {
    const tvGenres = [
      {
        name: "All Genres",
      },
      { id: "10759", name: "Action Adventure" },
      { id: "16", name: "Animation" },
      { id: "35", name: "Comedy" },
      { id: "80", name: "Crime" },
      { id: "99", name: "Documentary" },
      { id: "18", name: "Drama" },
      { id: "10751", name: "Family" },
      { id: "10762", name: "Kids" },
      { id: "9648", name: "Mystery" },
      { id: "10763", name: "News" },
      { id: "10764", name: "Reality" },
      { id: "10765", name: "Sci-Fi Fantasy" },
      { id: "10766", name: "Soap" },
      { id: "10767", name: "Talk" },
      { id: "10768", name: "War Politics" },
      { id: "37", name: "Western" },
    ];

    const { page = 1 } = req.query;

    const { genres = "All Genres" } = req.query;
    const { sort = "" } = req.query;

    const genre = tvGenres.find((el) => el.name === genres);
    const genreParams = genre.id;
    if (genre) {
      const options = {
        method: "GET",
        url:
          genre.name === "All Genres"
            ? `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=${sort}`
            : `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreParams}&sort_by=${sort}`,
        headers: { accept: "application/json", Authorization: API_KEY_JWT },
      };

      const response = await axios.request(options);
      res.json(response.data);
    } else {
      res.status(404).json({ success: false, message: "404 Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "500 Internal Server Error",
    });
  }
};
export const getNewMovies = async (req, res) => {
  try {
    const movieGenres = [
      {
        name: "All Genres",
      },
      {
        id: "28",
        name: "Action",
      },
      {
        id: "12",
        name: "Adventure",
      },
      {
        id: "16",
        name: "Animation",
      },
      {
        id: "35",
        name: "Comedy",
      },
      {
        id: "80",
        name: "Crime",
      },
      {
        id: "99",
        name: "Documentary",
      },
      {
        id: "18",
        name: "Drama",
      },
      {
        id: "10751",
        name: "Family",
      },
      {
        id: "14",
        name: "Fantasy",
      },
      {
        id: "36",
        name: "History",
      },
      {
        id: "27",
        name: "Horror",
      },
      {
        id: "10402",
        name: "Music",
      },
      {
        id: "9648",
        name: "Mystery",
      },
      {
        id: "10749",
        name: "Romance",
      },
      {
        id: "878",
        name: "Science Fiction",
      },
      {
        id: "10770",
        name: "TV Movie",
      },
      {
        id: "53",
        name: "Thriller",
      },
      {
        id: "10752",
        name: "War",
      },
      {
        id: "37",
        name: "Western",
      },
    ];
    const { page = 1 } = req.query;

    const { genres = "All Genres" } = req.query;
    const { sort = "" } = req.query;

    const genre = movieGenres.find((el) => el.name === genres);
    const genreParams = genre.id;
    if (genre) {
      const options = {
        method: "GET",
        url:
          genre.name === "All Genres"
            ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&primary_release_date.lte=2024-08-01&page=${page}&sort_by=${sort}`
            : `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&primary_release_date.lte=2024-08-01&page=${page}&with_genres=${genreParams}&sort_by=${sort}`,
        headers: { accept: "application/json", Authorization: API_KEY_JWT },
      };

      const response = await axios.request(options);
      res.json(response.data);
    } else {
      res.status(404).json({ success: false, message: "404 Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "500 Internal Server Error",
    });
  }
};

export const getSearch = async (req, res) => {
  const { search = "" } = req.query;
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
  const tvShowUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${search}`;
  try {
    const movieResponse = await axios.get(movieUrl);
    const tvShowResponse = await axios.get(tvShowUrl);
    const movies = movieResponse.data.results;
    const tvShow = tvShowResponse.data.results;
    let results = [];

    movies.forEach((movie) => {
      movie.state = "Movie";
      results.push(movie);
    });
    tvShow.forEach((movie) => {
      movie.state = "Tv";
      results.push(movie);
    });

    res.json(results);
  } catch (error) {
    console.error("Error:", error);
  }
};
