import React from "react";

import styles from "./SimilarStyles.module.scss";

import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FilmProps } from "./Trailer";
import axios from "axios";
import { API_KEY, IMAGE_URL, MovieInfo } from "../../utils/ApiMiddleWare";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

interface iSimilarFilms {
  results: MovieInfo[];
}
interface similarFilmProps {
  id: string | undefined;
  navTitle: string | undefined;
}
const SimilarFilms: React.FC<similarFilmProps> = ({ id, navTitle }) => {
  const [movie, setMovie] = React.useState<iSimilarFilms | undefined>();
  const [isLiked, setIsLiked] = React.useState(false);

  const onClickAddToList = () => {
    setIsLiked(!isLiked);
  };

  React.useEffect(() => {
    async function getSimilarMovies() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${navTitle}/${id}/recommendations?language=en-US&page=1`,
        {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        }
      );
      return setMovie(res.data);
    }
    window.scrollTo(0, 0);

    getSimilarMovies();
  }, [id]);

  return (
    <div className={styles.root}>
      <div>
        {movie && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView="auto"
            navigation
          >
            {movie.results.map((obj) => (
              <SwiperSlide style={{ width: "300px" }} key={obj.id}>
                <Link to={`/Home/${navTitle}/${id}/Similar/${obj.id}`}>
                  <div className={styles.filmCard}>
                    <button
                      className={styles.favoriteAdd}
                      onClick={onClickAddToList}
                    >
                      {isLiked ? (
                        <FavoriteIcon className={styles.favoritedBtn} />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )}
                    </button>
                    <p className={styles.rating}>
                      {String(obj.vote_average).split("").slice(0, 3).join("")}{" "}
                      <StarIcon />
                    </p>
                    <img
                      className={styles.titleImg}
                      src={`${IMAGE_URL}${obj.backdrop_path}`}
                      alt={obj.title}
                    />
                    <h3 className={styles.titleCard}>
                      {" "}
                      {navTitle === "tv" ? obj.name : obj.title}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default SimilarFilms;
