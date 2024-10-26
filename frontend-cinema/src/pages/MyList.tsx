import React from "react";
import styles from "../scss/modules/myListStykes.module.scss";
import WatchList from "../components/MyList/WatchList";

import EmptyList from "../components/MyList/Empty/EmptyList";
import { useSelector } from "react-redux";
import {
  fetchAllMovies,
  itemsUserList,
  removeAllFav,
  statusUserList,
} from "../redux/Slices/userList";
import { useAppDispatch } from "../redux/store";
import { fetchData } from "../redux/Slices/auth";

const MyList: React.FC = () => {
  const dispatch = useAppDispatch();
  const allItems = useSelector(itemsUserList);
  const status = useSelector(statusUserList);

  React.useEffect(() => {
    dispatch(fetchAllMovies());
    if (allItems.length == 0) {
      document.body.style.backgroundColor = "";
    } else {
      document.body.style.backgroundColor = "black";
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  if (allItems.length == 0 && status === "success") {
    return <EmptyList />;
  }

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.flexWrapper}>
          <h1 className={styles.mainTitle}>Your Lists</h1>
        </div>

        <WatchList />
        <h2 className={styles.title}>Your Liked list</h2>
      </div>
    </div>
  );
};

export default MyList;
