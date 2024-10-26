import React from "react";
import styles from "./EmptyStyles.module.scss";
import { Link } from "react-router-dom";
const EmptyList: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.flexWrap}>
          <h1>Your list is empty</h1>
          <p>
            Add a movie or tvshow you want to watch in the future or add one you
            liked
          </p>
          <Link to={"/"}>
            <button className={styles.backHome}>Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyList;
