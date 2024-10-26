import React from "react";

import styles from "../FilmRowStyles.module.scss";

import { Link } from "react-router-dom";

import { YOUTUBE_URL } from "../../../utils/ApiMiddleWare";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MovieList } from "../../../redux/Slices/movieInfo";
import Skeleton from "./Skeleton";

interface BlockProps {
  selected: MovieList | null;
  visible: boolean;
  category: string;
  mediaContent: string;
}
const Block: React.FC<BlockProps> = ({
  category,
  selected,
  visible,
  mediaContent,
}) => {
  const { movieTrailers, genres, status } = useSelector(
    (state: RootState) => state.movieInfo
  );

  const getGenreNames = (genreIds: number[]): string => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter((name) => name)
      .join(", ");
  };

  return (
    <>
      {selected && visible && (
        <div className={styles.description}>
          <div className={styles.text}>
            <div className={styles.titleInfo}>
              <h1>{selected.original_title}</h1>
              <p className={styles.rating}>{selected.vote_average}</p>
            </div>

            <div className={styles.moreInfo}>
              <p className={styles.date}>
                Realease date: {selected.release_date}
              </p>

              <p className={styles.ratingCount}>{selected.vote_count}:grades</p>
            </div>

            <p>{selected.overview}</p>

            <p className={styles.language}>
              Original language: {selected.original_language.toUpperCase()}
            </p>
            <p className={styles.genres}>
              Genres: {getGenreNames(selected.genre_ids)} {}
            </p>
            <div className={styles.comment}>
              <AccountCircleIcon />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius,
                autem.
              </p>
            </div>
            <div className={styles.desButtons}>
              <Link to={`/Home/${mediaContent}/${category}/${selected.id}`}>
                <button className={styles.watchBtn}>Watch Now</button>
              </Link>
              <button className={styles.addToFav}>Add to List</button>
            </div>
          </div>
          {status === "loading" ? (
            <Skeleton />
          ) : (
            <iframe
              className={styles.trailer}
              src={`${YOUTUBE_URL}${movieTrailers[selected.id]}`}
              title={selected.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      )}
    </>
  );
};

export default Block;
