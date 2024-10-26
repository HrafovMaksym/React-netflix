import React from "react";
import styles from "./FilmStyles.module.scss";

import { MovieInfo, YOUTUBE_URL } from "../../utils/ApiMiddleWare";

import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

import { fetchTrailer, getMovieTrailer } from "../../redux/Slices/movieInfo";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

export interface FilmProps {
  id: undefined | string;
  movie: MovieInfo;
}
const Film: React.FC<FilmProps> = ({ id, movie }) => {
  const movieId = Number(id);

  const dispatch = useAppDispatch();

  const movieTrailers = useSelector(fetchTrailer);
  const content = "movie";

  React.useEffect(() => {
    if (!movieTrailers[movieId]) {
      dispatch(getMovieTrailer({ movieId, content }));
    }
  }, [dispatch, movieId, content, movieTrailers]);
  const rating = movie.vote_average;
  const stars = 10;

  const [userRating, setUserRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const handleClick = (i: number) => {
    setUserRating(i + 1);
  };

  const handleMouseEnter = (i: number) => {
    setHoverRating(i + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className={styles.root}>
      {id && (
        <>
          <iframe
            className={styles.film}
            src={`${YOUTUBE_URL}${movieTrailers[movieId]}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h3 className={styles.filmRating}>
            Rate the film:{" "}
            {new Array(stars)
              .fill(null)
              .map((_, i) =>
                hoverRating > 0 ? (
                  i < hoverRating ? (
                    <StarIcon
                      key={i}
                      className={styles.newRatingStar}
                      onMouseEnter={() => handleMouseEnter(i)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(i)}
                    />
                  ) : (
                    <StarBorderIcon
                      key={i}
                      className={styles.newRatingStar}
                      onMouseEnter={() => handleMouseEnter(i)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(i)}
                    />
                  )
                ) : i < userRating ? (
                  <StarIcon
                    key={i}
                    className={styles.newRatingStar}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i)}
                  />
                ) : i < rating && !userRating ? (
                  <StarIcon
                    key={i}
                    className={styles.ratingStar}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i)}
                  />
                ) : (
                  <StarBorderIcon
                    key={i}
                    className={styles.ratingStar}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i)}
                  />
                )
              )}
          </h3>
        </>
      )}
    </div>
  );
};

export default Film;
