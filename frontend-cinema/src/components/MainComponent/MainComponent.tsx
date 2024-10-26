import React from "react";
import Header from "../Header/Header";
import filmImg from "../../assets/images/1349501.png";
import filmImg2 from "../../assets/images/1ddb9a19c1eb5d25dcdb92ac9625afe6.png";
import filmImg3 from "../../assets/images/toy-story-that-time-forgot-characters-wallpaper-2560x1080-10990_14.png";
import filmImg4 from "../../assets/images/1e618a0a090f720d2e58643f4a59575d.png";
import styles from "./mainStyles.module.scss";
import { Scrollbar, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import InfoIcon from "@mui/icons-material/Info";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link } from "react-router-dom";

const MainComponent: React.FC = () => {
  const objectsArray = [
    {
      id: "519182",
      title: "Despicable Me 4",
      imgUrl: filmImg,
      description:
        "Gru and his minions embark on another adventure filled with fun and chaos.Facing a mysterious villain threatening the world, Gru must navigate through dangerous obstacles with the help of his ever-loyal minions.",
    },
    {
      id: "301528",
      title: "Toy Story",
      imgUrl: filmImg3,
      description:
        "Woody and Buzz Lightyear lead their friends on a journey that reveals how big the world can be for a toy. After a new toy joins the group, Woody takes it upon himself to show why he should embrace being a toy.",
    },
    {
      id: "260514",
      title: "Cars 3",
      imgUrl: filmImg2,
      description:
        "Lightning McQueen sets out to prove to a new generation of racers that he's still the best race car in the world. With the help of a young race technician, he trains hard and learns new techniques to stay competitive.",
    },
    {
      id: "1011985",
      title: "Kung Fu Panda 4",
      imgUrl: filmImg4,
      description:
        "Po and his friends must face a new villain and embark on an adventure that challenges their kung fu skills. Po must unlock new levels of mastery and wisdom, relying on his friends and mentors to overcome the obstacles ahead.",
    },
  ];

  return (
    <div className={styles.root}>
      <Header />
      <Swiper
        modules={[Autoplay, Scrollbar]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 20000, disableOnInteraction: false }}
      >
        {objectsArray.map((obj, id) => (
          <SwiperSlide key={id}>
            <div className={styles.slider}>
              <img className={styles.background} src={obj.imgUrl} alt="" />
              <div className="container">
                <div className={styles.text}>
                  <h3>{obj.title}</h3>
                  <p>{obj.description}</p>
                  <div className={styles.filmBtns}>
                    <Link to={`/Home/Movie/${obj.id}`}>
                      <button className={styles.playBtn}>
                        <PlayCircleIcon />
                        Play
                      </button>
                    </Link>
                    <Link to={`/Home/Movie/${obj.id}`}>
                      <button className={styles.infoBtn}>
                        <InfoIcon />
                        More Info
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainComponent;
