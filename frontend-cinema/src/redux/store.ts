import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";

import auth from "./Slices/auth";
import movies from "./Slices/movies";
import movieInfo from "./Slices/movieInfo";

import tvShows from "./Slices/tvShow";

import pagination from "./Slices/Filtrarion/Pagination";
import categories from "./Slices/Filtrarion/Categories";
import sort from "./Slices/Filtrarion/Sort";
import search from "./Slices/Filtrarion/Search";
import userList from "./Slices/userList";
export const store = configureStore({
  reducer: {
    auth,
    userList,
    movieInfo,
    movies,
    tvShows,
    pagination,
    categories,
    sort,
    search,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
