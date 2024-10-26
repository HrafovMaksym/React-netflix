import axios from "axios";

export const API_KEY_JWT =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWYyYmM2ODMyZWFhYjRjOTUyOTBjYmM5OTVhMzhhMiIsIm5iZiI6MTcyNDQxNDcxNi41NTYxNzQsInN1YiI6IjY2YTY2OWNhZmU2YjQwNDJmZDExMDBkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MnkRxSdZ4MMtG5KVGLZXQn6Vo1JlCS5plHHTtEfUuyg";
export const API_KEY = "95f2bc6832eaab4c95290cbc995a38a2";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export const YOUTUBE_URL = "https://www.youtube.com/embed/";
export const movieGenres = [
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
export const tvGenres = [
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
export interface MovieInfo {
  id: number;
  title: string;
  name: string;
  overview: string;
  adult: boolean;
  backdrop_path: string;
  genres: [];
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline: string;
  origin_country: string;
  runtime: string;
  budget: string;
  revenue: string;
  production_companies: [];
  first_air_date: string;

  number_of_seasons: number;
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: null;
      season_number: number;
      vote_average: number;
    }
  ];
  status: string;
  episode_run_time: [];
  number_of_episodes: number;
  type: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: null;
  };

  in_production: boolean;
  state: string;
}

export interface CastInfo {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface iCrewTeam {
  known_for_department: string;
  name: string;
}

interface Video {
  key: string;
  site: string;
  type: string;
}

interface FetchMovieVideosResponse {
  results: Video[];
}

export const fetchMovieVideos = async (
  movieId: number,
  content: string
): Promise<FetchMovieVideosResponse> => {
  const response = await axios.get(
    `${
      content === "tv"
        ? `${BASE_URL}/tv/${movieId}/videos`
        : `${BASE_URL}/movie/${movieId}/videos`
    }`,
    {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    }
  );
  return response.data;
};

interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  genres: Genre[];
}

export const fetchGenres = async (): Promise<FetchGenresResponse> => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });
  return response.data;
};
