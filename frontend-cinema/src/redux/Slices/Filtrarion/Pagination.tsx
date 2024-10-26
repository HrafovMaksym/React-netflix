import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  allMoviePage: 1,
  pagesToShow: 10,
  lastPage: 500,
};

const PaginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage(state, action) {
      state.allMoviePage = action.payload;
    },
  },
});
export const { setPage } = PaginationSlice.actions;
export const isAllMoviePage = (state: RootState) =>
  state.pagination.allMoviePage;
export const visiblePages = (state: RootState) => state.pagination.pagesToShow;
export const lastPageAllMovies = (state: RootState) =>
  state.pagination.lastPage;
export default PaginationSlice.reducer;
