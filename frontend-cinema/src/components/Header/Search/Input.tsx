import React from "react";
import styles from "./InputStyles.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

import { IMAGE_URL, MovieInfo } from "../../../utils/ApiMiddleWare";
import { useAppDispatch } from "../../../redux/store";
import {
  getSearch,
  searchItems,
  searchStatus,
} from "../../../redux/Slices/Filtrarion/Search";
import { Link } from "react-router-dom";

const Input: React.FC = () => {
  const dispatch = useAppDispatch();

  const items: MovieInfo[] = useSelector(searchItems);
  const status = useSelector(searchStatus);
  const error = status === "error";
  const [value, setValue] = React.useState("");

  const divRef = React.useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const [debounceTimeout, setDebounceTimeout] =
    React.useState<NodeJS.Timeout | null>(null);

  const onClickBtn = () => {
    setIsOpen(!isOpen);

    setValue("");
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        if (value.length > 0) {
          try {
            dispatch(getSearch(value));
          } catch (e) {
            return error;
          }
        } else {
          setValue("");
        }
      }, 500)
    );
  };
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !event.composedPath().includes(divRef.current)) {
        setIsOpen(false);
        setValue("");
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={divRef} className={styles.root}>
      <input
        style={value == "" ? { borderRadius: "10px" } : {}}
        className={`${styles.searchInput} ${isOpen ? styles.open : ""}`}
        type="text"
        value={value}
        onChange={onChangeInput}
      />
      <button onClick={onClickBtn} className={styles.searchBtn}>
        <SearchIcon />
      </button>
      <div
        className={`${styles.nameBlock} ${
          items.length === 0 && value !== ""
            ? styles.notFound
            : items.length > 0 && value === ""
            ? styles.hidden
            : items.length > 0
            ? styles.found
            : ""
        }`}
      >
        {status === "loading" ? (
          "loading"
        ) : (
          <>
            {items.length > 0 ? (
              <>
                {items.map((obj) => (
                  <Link
                    to={`/Home/${obj.state}/${obj.id}`}
                    className={styles.cardFilm}
                  >
                    <img
                      className={styles.poster}
                      src={`${IMAGE_URL}${obj.poster_path}`}
                      alt={obj.title}
                    />
                    <div className={styles.filmInfo}>
                      <h3 className={styles.title}>
                        {obj.state == "Tv" ? obj.name : obj.title}
                      </h3>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <p
                          className={`${styles.votes} ${
                            obj.vote_average > 7 ? styles.highVotes : ""
                          }`}
                        >
                          {obj.vote_average !== 0
                            ? String(obj.vote_average).slice(0, 3)
                            : "No Votes"}
                        </p>
                        <p className={styles.data}>
                          {obj.state == "Tv"
                            ? obj.first_air_date
                              ? obj.first_air_date
                              : "No Release Date"
                            : obj.release_date
                            ? obj.release_date
                            : "No Release Date"}
                        </p>
                      </div>
                      <p className={styles.description}>
                        {obj.overview ? obj.overview : "No Desription"}
                      </p>
                      <p className={styles.seeMore}>Click to see more</p>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <h3 className={styles.titleNotFound}>
                The Movie or Series is not exist
              </h3>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
{
  /* items.length > 0 && !isLoading ? 
: (
          items.length == 0 &&
          !isLoading && (
            <>
            <h3 className={styles.titleNotFound}>
                The Movie or Series is not exist
              </h3>
            </>
          )
        )} */
}
// {items.length <= 0 ? (
//   "loading"
// ) : (
//   <>
//     {items.map((obj) => (
//       <Link
//         to={`/Home/${navTitle}/${obj.id}`}
//         className={styles.cardFilm}
//       >
//         <img
//           className={styles.poster}
//           src={`${IMAGE_URL}${obj.poster_path}`}
//           alt=""
//         />
//         <div className={styles.filmInfo}>
//           <h3 className={styles.title}>
//             {check ? obj.name : obj.title}
//           </h3>
//           <p className={styles.data}>{obj.release_date}</p>
//           <p className={styles.description}>
//             {obj.overview.split(".")[0]}
//           </p>
//         </div>
//       </Link>
//     ))}
//   </>
// )}
