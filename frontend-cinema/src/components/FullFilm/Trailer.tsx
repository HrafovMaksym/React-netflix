import React from "react";
import { YOUTUBE_URL } from "../../utils/ApiMiddleWare";
import styles from "./FilmStyles.module.scss";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { fetchTrailer, getMovieTrailer } from "../../redux/Slices/movieInfo";
export interface FilmProps {
  id: undefined | string;
}
const Trailer: React.FC<FilmProps> = ({ id }) => {
  const movieId = Number(id);
  const dispatch = useAppDispatch();
  const movieTrailers = useSelector(fetchTrailer);
  const content = "movie";
  if (!movieTrailers[movieId]) {
    dispatch(getMovieTrailer({ movieId, content }));
  }
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
        </>
      )}
    </div>
  );
};

export default Trailer;
