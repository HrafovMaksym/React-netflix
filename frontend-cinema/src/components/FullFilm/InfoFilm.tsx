import React from "react";
import styles from "./InfoFilmStyles.module.scss";

import { iCrewTeam, IMAGE_URL, MovieInfo } from "../../utils/ApiMiddleWare";

interface InfoFilmProps {
  movie: MovieInfo;
  crewTeam?: iCrewTeam[];
  onWatchBtn: (id: number) => void;
}
const InfoFilm: React.FC<InfoFilmProps> = ({ movie, crewTeam, onWatchBtn }) => {
  const rating = Number(
    String(movie.vote_average).split("").slice(0, 4).join("")
  );

  const directorName = crewTeam?.find(
    (el) => el.known_for_department === "Directing"
  )?.name;
  const [isRating, setIsRating] = React.useState(false);
  React.useEffect(() => {
    const updateRatingSize = () => {
      if (window.innerWidth < 1125) {
        setIsRating(true);
      }
    };
    updateRatingSize();
    window.addEventListener("resize", updateRatingSize);
    return () => {
      window.removeEventListener("resize", updateRatingSize);
    };
  }, []);
  return (
    <div className={styles.root}>
      <img
        className={styles.poster}
        src={`${IMAGE_URL}${movie.poster_path}`}
        alt={movie.title}
      />

      <div>
        <div className={styles.titleFlex}>
          <h1 className={styles.title}>{movie.title}</h1>
          {window.innerWidth < 1125 ? (
            ""
          ) : (
            <p
              className={`${styles.rating} ${
                rating >= 5 ? styles.highRating : ""
              }`}
            >
              {rating}
            </p>
          )}
        </div>
        <p className={styles.description}>Release date: {movie.release_date}</p>
        {isRating && (
          <p className={styles.description}>
            Rating:{" "}
            <span
              className={`${styles.rated} ${
                rating >= 5 ? styles.highRated : ""
              }`}
            >
              {rating}
            </span>
          </p>
        )}
        <p className={styles.description}>Tagline: {movie.tagline}</p>
        <p className={styles.description}>Country: {movie.origin_country}</p>
        <div className={styles.flexBlock}>
          Genres:
          {movie.genres.map((el: { id: number; name: string }) => (
            <p className={styles.description} key={el.id}>
              {el.name},
            </p>
          ))}
        </div>
        <p className={styles.description}>
          Time: <span> {movie.runtime} min</span>
        </p>
        <p className={styles.description}>Budget: {movie.budget}$</p>
        <p className={styles.description}>Revenue: {movie.revenue}$</p>
        <p className={styles.description}>Director: {directorName}</p>
        <div className={styles.flexBlock}>
          Production:
          {movie.production_companies
            .slice(0, 1)
            .map((obj: { id: number; name: string }) => (
              <p key={obj.id}>{obj.name}</p>
            ))}
        </div>
        <p className={styles.description}>
          Language: {movie.original_language}
        </p>
        <div className={styles.watchBtns}>
          <button onClick={() => onWatchBtn(0)} className={styles.movie}>
            Watch Movie
          </button>
          <button onClick={() => onWatchBtn(2)} className={styles.trailer}>
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoFilm;
{
  // title,
  // overview,
  // adult,
  // backdrop_path,
  // genres,
  // genre_ids,
  // original_language,
  // original_title,
  // popularity,
  // poster_path,
  // release_date,
  // video,
  // vote_average,
  // vote_count,
  // tagline,
  // origin_country,
  // runtime,
  // budget,
  // revenue,
}
