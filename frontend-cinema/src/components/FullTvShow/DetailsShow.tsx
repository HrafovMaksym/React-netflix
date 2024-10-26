import React from "react";
import styles from "./Details.module.scss";
import { iCrewTeam, IMAGE_URL, MovieInfo } from "../../utils/ApiMiddleWare";

interface InfoFilmProps {
  tvShow: MovieInfo;
  crewTeam?: iCrewTeam[];
  onWatchBtn: (id: number) => void;
}
const DetailsShow: React.FC<InfoFilmProps> = ({
  tvShow,
  crewTeam,
  onWatchBtn,
}) => {
  const rating = Number(
    String(tvShow.vote_average).split("").slice(0, 4).join("")
  );
  const directorName = crewTeam?.find(
    (el) => el.known_for_department === "Directing"
  )?.name;
  const creatorName = crewTeam?.find(
    (el) => el.known_for_department === "Creator"
  )?.name;
  const lang = tvShow.original_language.toUpperCase();
  return (
    <div className={styles.root}>
      <img
        className={styles.poster}
        src={`${IMAGE_URL}${tvShow.poster_path}`}
        alt={tvShow.title}
      />
      <div>
        <div className={styles.titleFlex}>
          <h1 className={styles.title}>{tvShow.name}</h1>
          <p
            className={`${styles.rating} ${
              rating >= 5 ? styles.highRating : ""
            }`}
          >
            {rating}
          </p>
        </div>
        <p className={styles.description}>
          Release date: {tvShow.first_air_date}
        </p>
        <p className={styles.description}>Type: {tvShow.type}</p>
        <p className={styles.description}>
          Tagline: {tvShow.tagline ? tvShow.tagline : "No tagline"}
        </p>
        <p className={styles.description}>Country: {tvShow.origin_country}</p>
        <div className={styles.flexBlock}>
          Genres:
          {tvShow.genres.map((el: { id: number; name: string }) => (
            <p className={styles.description} key={el.id}>
              {el.name},
            </p>
          ))}
        </div>
        <p className={styles.description}>
          Seasons: {tvShow.number_of_seasons}
        </p>
        <p className={styles.description}>
          Episodes: {tvShow.number_of_episodes}
        </p>
        <p className={styles.description}>
          Time episodes: {tvShow.episode_run_time} min
        </p>
        <p className={styles.description}>
          {directorName
            ? `Director: ${directorName}`
            : `Creator: ${creatorName}`}
        </p>
        <p className={styles.description}>
          Status: {tvShow.in_production ? "In Production" : "Completed"}
        </p>

        <div className={styles.flexBlock}>
          Production:
          {tvShow.production_companies
            .slice(0, 1)
            .map((obj: { id: number; name: string }) => (
              <p key={obj.id}>{obj.name}</p>
            ))}
        </div>
        <p className={styles.description}>
          Last episode: {tvShow.last_episode_to_air.name}
        </p>
        <p className={styles.description}>Language: {lang}</p>
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

export default DetailsShow;
