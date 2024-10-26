import React from "react";
import ReusablePage from "../components/Reusable/ReusablePage";

import { useSelector } from "react-redux";
import {
  fetchAllMovies,
  fetchAllMoviesStatus,
  getAllMovies,
} from "../redux/Slices/movies";
import { movieGenres, MovieInfo } from "../utils/ApiMiddleWare";

const Movies = () => {
  const allMovies: MovieInfo[] = useSelector(fetchAllMovies);
  const status = useSelector(fetchAllMoviesStatus);

  return (
    <div>
      <ReusablePage
        title={"All Movies"}
        navTitle={"Movies"}
        fetchItems={getAllMovies}
        items={allMovies}
        status={status}
        genres={movieGenres}
      />
    </div>
  );
};

export default Movies;
