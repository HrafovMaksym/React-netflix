import React from "react";
import ReusablePage from "../components/Reusable/ReusablePage";
import { MovieList } from "../redux/Slices/movieInfo";
import { useSelector } from "react-redux";
import {
  fetchNewMovies,
  fetchNewMoviesStatus,
  getNewMovies,
} from "../redux/Slices/movies";
import { MovieInfo } from "../utils/ApiMiddleWare";

const Popular = () => {
  const newMovies: MovieInfo[] = useSelector(fetchNewMovies);

  const status = useSelector(fetchNewMoviesStatus);
  const tvGenres = [
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

  return (
    <div>
      <ReusablePage
        title={"New & Popular"}
        navTitle={"New&Popular"}
        fetchItems={getNewMovies}
        items={newMovies}
        status={status}
        genres={tvGenres}
      />
    </div>
  );
};

export default Popular;
