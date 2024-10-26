import React from "react";

import axios from "axios";
import { API_KEY, IMAGE_URL } from "../../utils/ApiMiddleWare";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import styles from "./styles.module.scss";

interface CastInfo {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface ActorsInfo {
  cast?: CastInfo[];
  crew?: {};
}

const ActorBlock: React.FC<ActorsInfo> = ({ cast }) => {
  const [actorsCount, setActorsCount] = React.useState(4);
  React.useEffect(() => {
    const updateCountSlides = () => {
      const width = window.innerWidth;
      if (width < 550) {
        setActorsCount(2);
      } else if (width < 730) {
        setActorsCount(3);
      } else if (width < 930) {
        setActorsCount(4);
      } else if (width < 1150) {
        setActorsCount(5);
      } else {
        setActorsCount(6);
      }
    };
    updateCountSlides();
    window.addEventListener("resize", updateCountSlides);

    return () => {
      window.removeEventListener("resize", updateCountSlides);
    };
  }, []);
  return (
    <div className={styles.root}>
      <Swiper spaceBetween={10} slidesPerView={actorsCount}>
        {cast && (
          <>
            {cast.slice(0, 20).map((obj, id) => (
              <SwiperSlide key={id} className={styles.actorBlock}>
                <span>
                  <img src={`${IMAGE_URL}${obj.profile_path}`} alt={obj.name} />
                </span>
                <div className={styles.actorInfo}>
                  <h4>{obj.name}</h4>
                  <p>{obj.character}</p>
                </div>
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>
    </div>
  );
};

export default ActorBlock;
