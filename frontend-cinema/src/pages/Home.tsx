import React from "react";
import TitleHome from "../components/TitleComponents/TitleHome";
import { useSelector } from "react-redux";
import { fetchData, statusData } from "../redux/Slices/auth";

import Loader from "../components/PreLoader/Loader";

import styles from "../scss/modules/homepageStyles.module.scss";

import MainComponent from "../components/MainComponent/MainComponent";

import Footer from "../components/Footer/Footer";
import Sections from "../components/Sections/Sections";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const isAuth = useSelector(fetchData);
  const loader = useSelector(statusData);

  if (loader === "loading") {
    return <Loader />;
  }
  if (!isAuth) {
    return <TitleHome />;
  }

  return (
    <div className={styles.root}>
      <MainComponent />
      <Sections />
      <div className="container">
        <div className={styles.wrapper}>
          <Link to={"Home/Movies"}>
            <button className={styles.seeMore}>To See More</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
