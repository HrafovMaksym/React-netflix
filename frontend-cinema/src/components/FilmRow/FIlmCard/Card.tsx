import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import styles from "../FilmRowStyles.module.scss";

import { IMAGE_URL } from "../../../utils/ApiMiddleWare";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Skeleton from "./Skeleton";

import { MovieList } from "../../../redux/Slices/movieInfo";
import { fetchRequest } from "../../../redux/Slices/movies";

interface CardProps {
  selected: MovieList | null;
  visible: boolean;
  onClickMovie: (movie: MovieList, movieId: number) => void;
  movies: MovieList[];
  status: fetchRequest;
}

const Card: React.FC<CardProps> = ({
  selected,
  visible,
  onClickMovie,
  movies,
  status,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);

  const onClickAddToList = () => {
    setIsLiked(!isLiked);
  };
  const movie = movies.map((movie) => (
    <SwiperSlide style={{ width: "300px" }} key={movie.id}>
      <div
        className={`${styles.filmCard} ${
          selected?.id == movie.id && visible ? styles.visible : ""
        }`}
        onClick={() => onClickMovie(movie, movie.id)}
      >
        <button className={styles.favoriteAdd} onClick={onClickAddToList}>
          {isLiked ? (
            <FavoriteIcon className={styles.favoritedBtn} />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </button>

        <img
          className={styles.titleImg}
          src={`${IMAGE_URL}${movie.backdrop_path}`}
          alt="https://via.placeholder.com/300x160?text=Interstellar"
        />
        <h3 className={styles.titleCard}>{movie.title}</h3>
      </div>
    </SwiperSlide>
  ));
  const skeleton = [...new Array(4)].map((_, i) => (
    <SwiperSlide key={i}>
      <Skeleton />
    </SwiperSlide>
  ));
  return (
    <>
      <Swiper
        className={styles.swiper}
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView="auto"
        navigation={{
          nextEl: styles.nextBtn,
          prevEl: styles.prevBtn,
        }}
      >
        {status == "loading" ? skeleton : movie}
      </Swiper>
    </>
  );
};

export default Card;
