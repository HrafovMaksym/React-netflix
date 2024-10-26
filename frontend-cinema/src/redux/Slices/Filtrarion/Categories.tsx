import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IinitialState {
  category: string;
  visible: boolean;
}
const initialState: IinitialState = {
  category: "All Genres",
  visible: false,
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setVisible(state, action) {
      state.visible = action.payload;
    },
  },
});
export const category = (state: RootState) => state.categories.category;
export const isVisible = (state: RootState) => state.categories.visible;
export const { setCategory, setVisible } = CategorySlice.actions;
export default CategorySlice.reducer;
// https://api.themoviedb.org/3/discover/movie?with_genres=16
