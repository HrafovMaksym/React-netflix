import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieVideos, fetchGenres } from "../../utils/ApiMiddleWare";
import { fetchRequest } from "./movies";
import { RootState } from "../store";

export interface MovieList {
  id: number;
  title: string;
  overview: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}
interface MoviesState {
  genres: Genre[];
  status: fetchRequest;
  movieTrailers: { [key: number]: string | null };
}

const initialState: MoviesState = {
  movieTrailers: {},
  genres: [],
  status: fetchRequest.LOADING,
};

export const getGenres = createAsyncThunk<Genre[], void>(
  "movies/getGenres",
  async () => {
    const data = await fetchGenres();
    return data.genres;
  }
);
export const getMovieTrailer = createAsyncThunk<
  string | null,
  { movieId: number; content: string }
>("movies/getMovieTrailer", async ({ movieId, content }) => {
  const data = await fetchMovieVideos(movieId, content);
  const trailer = data.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
  return trailer ? trailer.key : null;
});

const movieInfoSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieTrailer.fulfilled, (state, action) => {
        const movieId = action.meta.arg.movieId;
        state.movieTrailers[movieId] = action.payload;
        state.status = fetchRequest.SUCCESS;
      })
      .addCase(getMovieTrailer.pending, (state, action) => {
        const movieId = action.meta.arg.movieId;
        state.movieTrailers[movieId] = null;
        state.status = fetchRequest.LOADING;
      })
      .addCase(getMovieTrailer.rejected, (state, action) => {
        const movieId = action.meta.arg.movieId;
        state.movieTrailers[movieId] = null;
        state.status = fetchRequest.ERROR;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const fetchTrailer = (state: RootState) => state.movieInfo.movieTrailers;
export default movieInfoSlice.reducer;
