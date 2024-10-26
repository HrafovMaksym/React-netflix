import React from "react";
import styles from "./TvStyles.module.scss";

import { MovieInfo, YOUTUBE_URL } from "../../utils/ApiMiddleWare";

import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

import { fetchTrailer, getMovieTrailer } from "../../redux/Slices/movieInfo";

export interface FilmProps {
  id: undefined | string;
  tvShow: MovieInfo;
}
const TvShow: React.FC<FilmProps> = ({ id, tvShow }) => {
  const movieId = Number(id);

  const dispatch = useAppDispatch();

  const movieTrailers = useSelector(fetchTrailer);
  const content = "tv";
  React.useEffect(() => {
    if (!movieTrailers[movieId]) {
      dispatch(getMovieTrailer({ movieId, content }));
    }
  }, [dispatch, movieId, content, movieTrailers]);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const onClickOpen = () => {
    setIsVisible(!isVisible);
  };
  const [isSeasonVisible, setIsSeasonVisible] = React.useState(false);
  const [isCount, setIsCount] = React.useState<number>(tvShow.seasons[0]?.id);

  const onChangeSeason = (id: number) => {
    setIsCount(id);
    setIsSeasonVisible(!isSeasonVisible);
  };
  const [isEpeasode, setIsEpeasode] = React.useState(1);
  const onClickEpisode = (id: number) => {
    setIsEpeasode(id + 1);
    setIsVisible(!isVisible);
    if (popupRef.current) {
      popupRef.current.scrollTop = 0;
    }
  };
  const title = tvShow.seasons.find((el) => el.id === isCount)?.name;
  const mainTitle = title + ", searies: " + isEpeasode;
  let titleClass;

  if (Number(title?.length) >= 8) {
    titleClass = styles.season;
  }
  if (Number(title?.length) >= 9) {
    titleClass = styles.maxTitle;
  }
  return (
    <div className={styles.root}>
      {id && (
        <>
          <div
            ref={popupRef}
            className={`${styles.block} ${isVisible ? styles.active : ""}`}
          >
            <span className={styles.title} onClick={onClickOpen}>
              {mainTitle}
            </span>

            <ul
              className={`${styles.seasonsBlock} ${
                isSeasonVisible ? styles.visible : ""
              }`}
            >
              <span
                onClick={() => setIsSeasonVisible(!isSeasonVisible)}
                className={titleClass}
              >
                {title}
              </span>
              {isSeasonVisible && (
                <>
                  {tvShow.seasons.map((obj, id) => (
                    <li key={id} onClick={() => onChangeSeason(obj.id)}>
                      {obj.name}
                    </li>
                  ))}
                </>
              )}
            </ul>

            <ul className={styles.episodeBlock}>
              {tvShow.seasons.find((el) => el.id === isCount)?.episode_count &&
                Array.from(
                  {
                    length:
                      tvShow.seasons.find((el) => el.id === isCount)
                        ?.episode_count ?? tvShow.seasons[0]?.id,
                  },
                  (_, i) => (
                    <li onClick={() => onClickEpisode(i)} key={i + 1}>
                      {i + 1}
                    </li>
                  )
                )}
            </ul>
          </div>
          {<iframe
            className={styles.film}
            src={`${YOUTUBE_URL}${movieTrailers[movieId]}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> ? (
            <iframe
              className={styles.film}
              src={`${YOUTUBE_URL}${movieTrailers[movieId]}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            "No frame"
          )}
        </>
      )}
    </div>
  );
};

export default TvShow;
