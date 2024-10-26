import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IinitialState {
  sortParametrs: string;
  visibleSort: boolean;
}
const initialState: IinitialState = {
  sortParametrs: "Sort",
  visibleSort: false,
};

const SortSlice = createSlice({
  name: "Sort",
  initialState,
  reducers: {
    setSort(state, action) {
      state.sortParametrs = action.payload;
    },
    setSortVisible(state, action) {
      state.visibleSort = action.payload;
    },
  },
});
export const sortParams = (state: RootState) => state.sort.sortParametrs;
export const sortVisible = (state: RootState) => state.sort.visibleSort;
export const { setSort, setSortVisible } = SortSlice.actions;
export default SortSlice.reducer;
