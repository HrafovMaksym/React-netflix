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
  tvShow: [],
  error: { message: null, status: null } as ErrorState,
  status: fetchRequest.LOADING,
};

interface FetchTVArgs {
  page: number;
  genres: string;
  sort: string;
}
export const getTvShows = createAsyncThunk(
  "movies/tvShow",
  async ({ genres, page, sort }: FetchTVArgs, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/tv/all?page=${page}&genres=${genres}&sort=${sort}`
      );
      return data;
    } catch (error: any) {
      const statusCode = error.response?.status;
      const errorMessage =
        error.response?.data?.message || "Failed to fetch movies";

      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch movies",
        status: error.response?.status,
      });
    }
  }
);
const tvshowSlice = createSlice({
  name: "tvShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getTvShows.pending, (state) => {
        state.status = fetchRequest.LOADING;
        state.tvShow = [];
      })
      .addCase(getTvShows.fulfilled, (state, action) => {
        state.status = fetchRequest.SUCCESS;
        state.tvShow = action.payload.results;
      })
      .addCase(getTvShows.rejected, (state, action) => {
        const error = action.payload as ErrorState;
        state.status = fetchRequest.ERROR;
        state.error = {
          message: error.message,
          status: error.status,
        };
        state.tvShow = [];
      });
  },
});
export const fetchTvShows = (state: RootState) => state.tvShows.tvShow;
export const fetchError = (state: RootState) => state.tvShows.error;
export const fetchStatus = (state: RootState) => state.tvShows.status;
export default tvshowSlice.reducer;
