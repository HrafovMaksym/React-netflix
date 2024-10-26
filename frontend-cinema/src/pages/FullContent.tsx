import React from "react";

import styles from "../scss/modules/fullFilmStyles.module.scss";

import { useParams } from "react-router-dom";
import axios from "axios";

import {
  API_KEY,
  CastInfo,
  iCrewTeam,
  IMAGE_URL,
  MovieInfo,
} from "../utils/ApiMiddleWare";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoIcon from "@mui/icons-material/Info";

import ActorBlock from "../components/FullFilm/ActorBlock";
import Film from "../components/FullFilm/Film";
import InfoFilm from "../components/FullFilm/InfoFilm";
import Trailer from "../components/FullFilm/Trailer";
import SimilarFilms from "../components/FullFilm/SimilarFilms";

import Comments from "../components/FullFilm/Comments";
import { useAppDispatch } from "../redux/store";

import Skeleton from "../components/FullFilm/Skeleton";
import NotFound from "./NotFound";
import TvShow from "../components/FullTvShow/TvShow";
import DetailsShow from "../components/FullTvShow/DetailsShow";
import userList, {
  addToFavList,
  fetchAllMovies,
  itemsUserList,
  removeFromFavList,
  setToogle,
  trueToogle,
  userListToogle,
} from "../redux/Slices/userList";
import { useSelector } from "react-redux";

interface ActorsInfo {
  cast: CastInfo[];
  crew: iCrewTeam[];
}

const FullContent: React.FC = () => {
  let { id, navTitle } = useParams();

  const dispatch = useAppDispatch();
  const toogle = useSelector(userListToogle);
  const allItems = useSelector(itemsUserList);
  const [content, setContent] = React.useState<MovieInfo>();
  const [arrActors, setArrActors] = React.useState<ActorsInfo>();

  const [error, setError] = React.useState(false);

  const [isLiked, setIsLiked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const [active, setActive] = React.useState(0);

  const [loading, setLoading] = React.useState(false);

  const contentRef = React.useRef<HTMLDivElement>(null);
  const infoRef = React.useRef<HTMLDivElement>(null);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onClickWatchContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
      setActive(0);
    }
  };
  const onClickInfo = () => {
    setActive(1);
  };
  const onClickActive = (id: number) => {
    setActive(id);
  };
  const onClickLike = () => {
    setIsLiked(!isLiked);
  };
  if (navTitle === "TvShows" || navTitle === "tv" || navTitle === "Tv") {
    navTitle = "tv";
  } else {
    navTitle = "movie";
  }
  const filmId = allItems.find((el) => el.filmId === content?.id)?.filmId;

  React.useEffect(() => {
    async function getContentId() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/${navTitle}/${id}?language=en-US`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
          }
        );
        setLoading(false);

        setContent(res.data);
      } catch (e) {
        setError(true);
        if (error) {
          return <NotFound />;
        }
      }
    }
    async function getActors() {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${navTitle}/${id}/credits`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
          }
        );
        setArrActors(res.data);
      } catch (error) {}
    }
    dispatch(fetchAllMovies());
    getActors();
    getContentId();
  }, [id]);

  const onClickAddList = () => {
    if (content) {
      const addedContent = {
        filmId: content.id,
        title: content.title,
        date: content.release_date,
        poster: content.poster_path,
        tvTitle: content.name,
        navTitle: navTitle,
      };
      if (filmId) {
        dispatch(removeFromFavList({ filmId }));
      } else {
        dispatch(addToFavList(addedContent));
      }
    }
  };

  const navList = [
    navTitle === "tv" ? "Series" : "Movie",
    "Details",
    "Trailer",
  ];

  if (loading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      {content && (
        <div className={styles.root}>
          <div
            style={{
              backgroundImage: `url(${IMAGE_URL}${content.backdrop_path})`,
            }}
            className={styles.background}
          ></div>
          <div className="container">
            <div className={styles.flexTitle}>
              <div className={styles.titleInfo}>
                <h1 className={styles.title}>
                  {navTitle === "tv" ? content.name : content.title}
                </h1>
                <div className={styles.titleDes}>
                  {navTitle === "tv"
                    ? content.first_air_date
                    : content.release_date}
                  {content.genres.map((el: { name: string; id: number }) => (
                    <p key={el.id}>
                      <span>|</span>
                      {el.name}
                    </p>
                  ))}
                </div>
                <div className={styles.titleBtns}>
                  <button
                    onClick={onClickWatchContent}
                    className={styles.watchBtn}
                  >
                    Continue watching
                  </button>

                  <button onClick={onClickAddList} className={styles.addToFav}>
                    {filmId ? <BookmarkIcon /> : <BookmarkAddOutlinedIcon />}
                    Add Watchlist
                  </button>
                </div>
              </div>
              <div className={styles.shareBtns}>
                <button onClick={onClickLike}>
                  {isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} Like
                </button>
                <a href="#details">
                  <button
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={onClickInfo}
                  >
                    {isHovered ? <InfoIcon /> : <InfoOutlinedIcon />}
                    Details
                  </button>
                </a>
                <button>
                  <ShareIcon /> Share
                </button>
              </div>
            </div>
            <h3 className={styles.titleOverview}>Story Line</h3>
            <p className={styles.overview}>{content.overview}</p>
            <h3 className={styles.titleActors}>Top Cast</h3>
            <ActorBlock {...arrActors} />
            <div className={styles.nav}>
              {navList.map((el, id) => (
                <p
                  key={id}
                  onClick={() => onClickActive(id)}
                  className={`${styles.navList} ${
                    active === id ? styles.active : ""
                  }`}
                >
                  {el}
                </p>
              ))}
            </div>

            <div ref={contentRef}>
              {active === 0 && (
                <>
                  {navTitle === "tv" ? (
                    <TvShow id={id} tvShow={content} />
                  ) : (
                    <Film id={id} movie={content} />
                  )}
                </>
              )}
            </div>
            <div id="details" ref={infoRef}>
              {active === 1 && (
                <>
                  {navTitle === "tv" ? (
                    <DetailsShow
                      onWatchBtn={onClickActive}
                      crewTeam={arrActors?.crew}
                      tvShow={content}
                    />
                  ) : (
                    <InfoFilm
                      onWatchBtn={onClickActive}
                      movie={content}
                      crewTeam={arrActors?.crew}
                    />
                  )}
                </>
              )}
            </div>
            {active === 2 && (
              <>
                {navTitle === "tv" ? <Trailer id={id} /> : <Trailer id={id} />}
              </>
            )}
            <h3>Similar Films</h3>
            <SimilarFilms id={id} navTitle={navTitle} />
            <h3>Comments</h3>
            <Comments />
          </div>
        </div>
      )}
    </>
  );
};

export default FullContent;
