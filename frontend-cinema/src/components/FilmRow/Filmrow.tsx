import React from "react";

import Card from "./FIlmCard/Card";
import Block from "./FilmOverview/Block";

import styles from "./FilmRowStyles.module.scss";

import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { fetchTrailer, getMovieTrailer } from "../../redux/Slices/movieInfo";

import { MovieList } from "../../redux/Slices/movieInfo";
import { fetchRequest } from "../../redux/Slices/movies";

interface FilmrowProps {
  title: string;
  movies: MovieList[];
  status: fetchRequest;
  mediaContent: string;
}
const Filmrow: React.FC<FilmrowProps> = ({
  title,
  movies,
  status,
  mediaContent,
}) => {
  const dispatch = useAppDispatch();
  const movieTrailers = useSelector(fetchTrailer);

  const [selectedMovie, setSelectedMovie] = React.useState<null | MovieList>(
    null
  );
  const [isVisible, setIsVisible] = React.useState(false);
  const content = "movie";
  const onClickMovie = (movie: MovieList, movieId: number) => {
    if (selectedMovie?.id == movie.id) {
      setIsVisible(!isVisible);
    } else {
      setSelectedMovie(movie);
      setIsVisible(true);
    }
    if (!movieTrailers[movieId]) {
      dispatch(getMovieTrailer({ movieId, content }));
    }
  };

  return (
    <div className={styles.root}>
      <div className="container">
        <h2>{title}</h2>
        <Card
          selected={selectedMovie}
          visible={isVisible}
          onClickMovie={onClickMovie}
          movies={movies}
          status={status}
        />
        <Block
          category={title}
          mediaContent={mediaContent}
          selected={selectedMovie}
          visible={isVisible}
        />
      </div>
    </div>
  );
};

export default Filmrow;
