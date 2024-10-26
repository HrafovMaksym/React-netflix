import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import axios from "../../axiosConfig/axios";

export enum fetchRequest {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
interface ErrorState {
  message: string | null;
  status?: number | null;
}

const initialState = {
  popularMovies: [],
  statusPopular: fetchRequest.LOADING,
  highRatedMovies: [],
  statusRated: fetchRequest.LOADING,
  trendingMovies: [],
  trendingStatus: fetchRequest.LOADING,
  upcomingMovies: [],
  upcomingStatus: fetchRequest.LOADING,
  allMovies: [],
  error: { message: null, status: null } as ErrorState,
  statusAllMovies: fetchRequest.LOADING,
  newMovies: [],
  newMoviesStatus: fetchRequest.LOADING,
};

export const getPopularMovies = createAsyncThunk(
  "/movies/popular",
  async () => {
    const { data } = await axios.get("/movies/popular");
    return data;
  }
);
export const getRatedMovies = createAsyncThunk("movies/highRated", async () => {
  const { data } = await axios.get("/movies/highRated");
  return data;
});
export const getTrending = createAsyncThunk("movies/trending", async () => {
  const { data } = await axios.get("/movies/trending");
  return data;
});
export const getUpcomingMovies = createAsyncThunk(
  "movies/upcoming",
  async () => {
    const { data } = await axios.get("/movies/upcoming");
    return data;
  }
);
interface FetchMoviesArgs {
  page: number;
  genres: string;
  sort: string;
}
export const getAllMovies = createAsyncThunk(
  "movies/allMvoies",
  async ({ genres, page, sort }: FetchMoviesArgs, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/movies/all?page=${page}&genres=${genres}&sort=${sort}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch movies",
        status: error.response?.status,
      });
    }
  }
);
export const getNewMovies = createAsyncThunk(
  "movies/new",
  async ({ genres, page, sort }: FetchMoviesArgs) => {
    const { data } = await axios.get(
      `/movies/new?page=${page}&genres=${genres}&sort=${sort}`
    );
    return data;
  }
);
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.statusPopular = fetchRequest.LOADING;
        state.popularMovies = [];
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.statusPopular = fetchRequest.SUCCESS;
        state.popularMovies = action.payload.results;
      })
      .addCase(getPopularMovies.rejected, (state) => {
        state.statusPopular = fetchRequest.ERROR;
        state.popularMovies = [];
      })
      .addCase(getRatedMovies.pending, (state) => {
        state.statusRated = fetchRequest.LOADING;
        state.highRatedMovies = [];
      })
      .addCase(getRatedMovies.fulfilled, (state, action) => {
        state.statusRated = fetchRequest.SUCCESS;
        state.highRatedMovies = action.payload.results;
      })
      .addCase(getRatedMovies.rejected, (state) => {
        state.statusRated = fetchRequest.ERROR;
        state.highRatedMovies = [];
      })
      .addCase(getTrending.pending, (state) => {
        state.trendingStatus = fetchRequest.LOADING;
        state.trendingMovies = [];
      })
      .addCase(getTrending.fulfilled, (state, action) => {
        state.trendingStatus = fetchRequest.SUCCESS;
        state.trendingMovies = action.payload.results;
      })
      .addCase(getTrending.rejected, (state) => {
        state.trendingStatus = fetchRequest.ERROR;
        state.trendingMovies = [];
      })
      .addCase(getUpcomingMovies.pending, (state) => {
        state.upcomingStatus = fetchRequest.LOADING;
        state.upcomingMovies = [];
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.upcomingStatus = fetchRequest.SUCCESS;
        state.upcomingMovies = action.payload.results;
      })
      .addCase(getUpcomingMovies.rejected, (state) => {
        state.upcomingStatus = fetchRequest.ERROR;
        state.upcomingMovies = [];
      })
      .addCase(getAllMovies.pending, (state) => {
        state.statusAllMovies = fetchRequest.LOADING;
        state.allMovies = [];
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.statusAllMovies = fetchRequest.SUCCESS;
        state.allMovies = action.payload.results;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        const error = action.payload as ErrorState;
        state.statusAllMovies = fetchRequest.ERROR;
        state.error = {
          message: error.message,
          status: error.status,
        };
        state.allMovies = [];
      })
      .addCase(getNewMovies.pending, (state) => {
        state.newMoviesStatus = fetchRequest.LOADING;
        state.newMovies = [];
      })
      .addCase(getNewMovies.fulfilled, (state, action) => {
        state.newMoviesStatus = fetchRequest.SUCCESS;
        state.newMovies = action.payload.results;
      })
      .addCase(getNewMovies.rejected, (state) => {
        state.newMoviesStatus = fetchRequest.ERROR;
        state.newMovies = [];
      });
  },
});
export const fetchPopular = (state: RootState) => state.movies.popularMovies;
export const fetchAllMovies = (state: RootState) => state.movies.allMovies;

export const fetchNewMovies = (state: RootState) => state.movies.newMovies;
export const fetchNewMoviesStatus = (state: RootState) =>
  state.movies.newMoviesStatus;
export const fetchError = (state: RootState) => state.movies.error;
export const fetchAllMoviesStatus = (state: RootState) =>
  state.movies.statusAllMovies;
export default movieSlice.reducer;
