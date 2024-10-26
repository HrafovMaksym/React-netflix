import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRequest } from "./movies";
import { RootState } from "../store";
import axios from "../../axiosConfig/axios";
interface iMovie {
  title: string;
  tvTitle: string;
  poster: string;
  filmId: number;
  navTitle: string | undefined;
}
interface IinitialState {
  items: iMovie[];
  status: fetchRequest;
  toogle: boolean;
}

const initialState: IinitialState = {
  items: [],
  status: fetchRequest.LOADING,
  toogle: false,
};
export const addToFavList = createAsyncThunk(
  "fetchAddFavToList",
  async (params: {
    filmId: number;
    title: string;
    poster: string;
    tvTitle: string;
    navTitle: string | undefined;
  }) => {
    const { data } = await axios.post("/favoriteList", params);
    return data;
  }
);
export const fetchAllMovies = createAsyncThunk("fetchAllMovies", async () => {
  const { data } = await axios.get("/allFavMovies");
  return data;
});
export const removeAllFav = createAsyncThunk("removeAll", async () => {
  const { data } = await axios.delete("/removeAllFavMovies");
  return data;
});
export const removeFromFavList = createAsyncThunk(
  "fetchAllMovies",
  async (params: { filmId: number }) => {
    const { data } = await axios.delete("/removeFavMovie", {
      data: params,
    });
    return data;
  }
);
const userListSlice = createSlice({
  name: "fetchAllMovies",
  initialState,
  reducers: {
    setToogle(state) {
      state.toogle = !state.toogle;
    },
    trueToogle(state, action) {
      state.toogle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = fetchRequest.LOADING;
        state.items = [];
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = fetchRequest.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = fetchRequest.ERROR;
        state.items = [];
      });
  },
});
export const { setToogle, trueToogle } = userListSlice.actions;
export const userListToogle = (state: RootState) => state.userList.toogle;
export const itemsUserList = (state: RootState) => state.userList.items;
export const statusUserList = (state: RootState) => state.userList.status;
export default userListSlice.reducer;
