import React from "react";
import styles from "./WatchListStyles.module.scss";

import { IMAGE_URL } from "../../utils/ApiMiddleWare";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  fetchAllMovies,
  itemsUserList,
  removeAllFav,
  removeFromFavList,
} from "../../redux/Slices/userList";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { useAppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";

const WatchList: React.FC = () => {
  const allItems = useSelector(itemsUserList);
  const dispatch = useAppDispatch();
  const [isValue, setIsValue] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValue(e.target.value);
  };
  const onRemoveText = () => {
    setIsValue("");
    inputRef.current?.focus();
  };
  const onClickRemove = (filmId: any) => {
    dispatch(removeFromFavList({ filmId }));
  };
  const onCLickRemoveWatchList = () => {
    dispatch(removeAllFav());
  };
  return (
    <div className={styles.root}>
      <div className={styles.titleFlex}>
        <h2 className={styles.title}>Your Watch list</h2>
        <div className={styles.flex}>
          <input ref={inputRef} onChange={onChangeInput} value={isValue} />
          <button onClick={onRemoveText} className={styles.textDelete}>
            {isValue ? <CloseIcon /> : <SearchIcon />}
          </button>
          <p onClick={onCLickRemoveWatchList} className={styles.clearItems}>
            Clear your watch list
          </p>
        </div>
      </div>
      <div className={styles.wrapper}>
        {allItems
          .filter((obj) =>
            obj.title.toLowerCase().includes(isValue.toLowerCase())
          )
          .map((obj) => (
            <div className={styles.card}>
              <span
                className={styles.btnRemove}
                onClick={() => onClickRemove(obj.filmId)}
              >
                <BookmarkAddIcon />
              </span>

              <Link to={`${obj.navTitle}/${obj.filmId}`}>
                <img
                  className={styles.poster}
                  src={`${IMAGE_URL}${obj.poster}`}
                  alt=""
                />
                <h3 className={styles.cardTitle}>
                  {obj.title ? obj.title : obj.tvTitle}
                </h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WatchList;
