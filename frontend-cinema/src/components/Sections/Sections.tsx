import React from "react";

import Filmrow from "../FilmRow/Filmrow";
import { getGenres } from "../../redux/Slices/movieInfo";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

import {
  getPopularMovies,
  getRatedMovies,
  getTrending,
  getUpcomingMovies,
} from "../../redux/Slices/movies";
const Sections: React.FC = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getRatedMovies());
    dispatch(getTrending());
    dispatch(getUpcomingMovies());
    dispatch(getGenres());
  }, []);

  const { popularMovies, statusPopular } = useSelector(
    (state: RootState) => state.movies
  );
  const { upcomingMovies, upcomingStatus } = useSelector(
    (state: RootState) => state.movies
  );
  const { trendingMovies, trendingStatus } = useSelector(
    (state: RootState) => state.movies
  );
  const { statusRated, highRatedMovies } = useSelector(
    (state: RootState) => state.movies
  );

  return (
    <div>
      <Filmrow
        title="Popular"
        mediaContent="Movie"
        movies={popularMovies}
        status={statusPopular}
      />
      <Filmrow
        title="Upcoming"
        mediaContent="Movie"
        movies={upcomingMovies}
        status={upcomingStatus}
      />
      <Filmrow
        title="Trending"
        mediaContent="Movie"
        movies={trendingMovies}
        status={trendingStatus}
      />
      <Filmrow
        title="High Rated"
        mediaContent="Movie"
        movies={highRatedMovies}
        status={statusRated}
      />
    </div>
  );
};

export default Sections;
