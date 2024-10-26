import React from "react";
import ReusablePage from "../components/Reusable/ReusablePage";
import { MovieList } from "../redux/Slices/movieInfo";
import { useSelector } from "react-redux";

import { fetchStatus, fetchTvShows, getTvShows } from "../redux/Slices/tvShow";
import { MovieInfo, tvGenres } from "../utils/ApiMiddleWare";

const TvShow = () => {
  const tvShows: MovieInfo[] = useSelector(fetchTvShows);
  const status = useSelector(fetchStatus);

  return (
    <div>
      <ReusablePage
        title={"Tv Shows"}
        navTitle={"TvShows"}
        fetchItems={getTvShows}
        items={tvShows}
        status={status}
        genres={tvGenres}
      />
    </div>
  );
};

export default TvShow;
