import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "../../../axiosConfig/axios";
import { MovieInfo } from "../../../utils/ApiMiddleWare";
import { fetchRequest } from "../movies";
interface IinitialState {
  searchParametr: string;
  searchedItems: MovieInfo[];
  searchedStatus: fetchRequest;
}
const initialState: IinitialState = {
  searchParametr: "",
  searchedItems: [],
  searchedStatus: fetchRequest.LOADING,
};

export const getSearch = createAsyncThunk(
  "movies/search",
  async (search: string) => {
    try {
      const { data } = await axios.get(`/movies/search?search=${search}`);
      return data;
    } catch (error: any) {
      return alert("Search unavaible");
    }
  }
);
const SearchSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.searchParametr = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearch.pending, (state) => {
        state.searchedStatus = fetchRequest.LOADING;
        state.searchedItems = [];
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.searchedStatus = fetchRequest.SUCCESS;
        state.searchedItems = action.payload;
      })
      .addCase(getSearch.rejected, (state) => {
        state.searchedStatus = fetchRequest.ERROR;
        state.searchedItems = [];
      });
  },
});
export const searchParams = (state: RootState) => state.search.searchParametr;
export const searchItems = (state: RootState) => state.search.searchedItems;
export const searchStatus = (state: RootState) => state.search.searchedStatus;
export const { setSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
