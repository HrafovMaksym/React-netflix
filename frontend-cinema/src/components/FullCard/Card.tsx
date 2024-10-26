import React from "react";
import styles from "./CardStyles.module.scss";

import { IMAGE_URL, MovieInfo } from "../../utils/ApiMiddleWare";

import { Link } from "react-router-dom";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface CardProps {
  content: MovieInfo[];
  category: string;
  navTitle: string;
}
const Card: React.FC<CardProps> = ({ content, category, navTitle }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  const onClickAddToList = () => {
    setIsLiked(!isLiked);
  };

  const movie = content.map((obj) => (
    <div key={obj.id} className={styles.card}>
      <button className={styles.favoriteAdd} onClick={onClickAddToList}>
        {isLiked ? (
          <FavoriteIcon className={styles.favoritedBtn} />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </button>
      <Link to={`/Home/${navTitle}/${category}/${obj.id}`}>
        <span>
          <img
            className={styles.poster}
            src={`${IMAGE_URL}${obj.poster_path}`}
            alt=""
          />
          <h3 className={styles.cardTitle}>
            {navTitle === "TvShows" ? obj.name : obj.title}
          </h3>
        </span>
      </Link>
    </div>
  ));

  return <div className={styles.root}>{movie}</div>;
};

export default Card;
