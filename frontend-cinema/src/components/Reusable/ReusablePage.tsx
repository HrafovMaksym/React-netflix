import React from "react";
import styles from "../../scss/modules/allmovies.module.scss";
import Categories from "../../components/Filtration/CategoriesBlock/Categories";
import Sort from "../../components/Filtration/SortBlock/Sort";

import Card from "../../components/FullCard/Card";
import Pagination from "../../components/Filtration/Pagination/Pagination";
import { useAppDispatch } from "../../redux/store";

import { setPage } from "../../redux/Slices/Filtrarion/Pagination";
import Skeleton from "../../components/FullCard/Skeleton";
import { useLocation } from "react-router-dom";
import { setCategory } from "../../redux/Slices/Filtrarion/Categories";
import NotFound from "../../pages/NotFound";
import { setSort } from "../../redux/Slices/Filtrarion/Sort";

import { MovieInfo } from "../../utils/ApiMiddleWare";
import { useSelector } from "react-redux";
import { searchParams } from "../../redux/Slices/Filtrarion/Search";
import Filtration from "../Filtration/Filtration";

interface NavPageProps {
  title: string;
  navTitle: string;
  fetchItems: Function;
  items: MovieInfo[];
  status: string;
  genres: { id: string; name: string }[];
}
const ReusablePage: React.FC<NavPageProps> = ({
  title,
  navTitle,
  fetchItems,
  items,
  status,
  genres,
}) => {
  const dispatch = useAppDispatch();

  const searchParametr = useSelector(searchParams);
  const location = useLocation();

  const currentState = React.useRef(false);
  const currentPage = parseInt(location.search?.split("=")[1] || "1");
  const currentGenre =
    location.search
      ?.split("&")
      .find((param) => param.includes("genre="))
      ?.split("=")[1] || "All Genres";
  const currentSort =
    location.search
      ?.split("&")
      .find((param) => param.includes("sortBy="))
      ?.split("=")[1] || "Sort";
  React.useEffect(() => {
    dispatch(
      fetchItems({
        page: currentPage,
        genres: currentGenre,
        sort: currentSort,
      })
    );
    dispatch(setPage(currentPage));
    dispatch(setCategory(currentGenre));
    dispatch(setSort(currentSort));
    window.scrollTo(0, 0);
    currentState.current = true;
  }, [currentPage, currentGenre, currentSort, searchParametr]);

  const movie = (
    <Card category={currentGenre} content={items} navTitle={navTitle} />
  );
  const skeleton = [...new Array(20)].map((_, id) => <Skeleton key={id} />);

  if (currentPage > 500) {
    return <NotFound />;
  }

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.flexTitle}>
          <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
            <h1 className={styles.title}>{title}</h1>
            <Categories pageName={navTitle} genres={genres} />
          </div>
          <div>
            {" "}
            <Sort pageName={navTitle} />
            <Filtration pageName={navTitle} genres={genres} />
          </div>
        </div>
        {status === "loading" ? skeleton : movie}

        <Pagination pageName={navTitle} />
      </div>
    </div>
  );
};

export default ReusablePage;
