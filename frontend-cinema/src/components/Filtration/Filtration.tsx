import React from "react";
import styles from "./FiltrationBlockStyles.module.scss";
import Categories from "./CategoriesBlock/Categories";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { isAllMoviePage } from "../../redux/Slices/Filtrarion/Pagination";
import { useSelector } from "react-redux";
import { category } from "../../redux/Slices/Filtrarion/Categories";
import { sortParams } from "../../redux/Slices/Filtrarion/Sort";
import { useAppDispatch } from "../../redux/store";
interface filtrationProps {
  pageName: string;
  genres: {
    id: string;
    name: string;
  }[];
}
const Filtration: React.FC<filtrationProps> = ({ pageName, genres }) => {
  const sortOptions = [
    { value: "title.asc", label: "Title (A-Z)" },
    { value: "popularity.desc", label: "Popularity (Desc)" },
    { value: "popularity.asc", label: "Popularity (Asc)" },
    { value: "revenue.desc", label: "Revenue (Desc)" },
  ];

  const isCurrentPage = useSelector(isAllMoviePage);
  const isCurrentGenre = useSelector(category);

  const sort = useSelector(sortParams);
  const navigate = useNavigate();
  const [isActive, setIsActive] = React.useState(false);
  const [genresActive, setGenresActive] = React.useState(false);
  const [sortActive, setSortActive] = React.useState(false);
  const onClickCategory = () => {
    setGenresActive(!genresActive);
    setSortActive(false);
  };
  const onClickSort = () => {
    setSortActive(!sortActive);
    setGenresActive(false);
  };
  const onClickFilter = () => {
    setIsActive(false);
    setGenresActive(false);
    setSortActive(false);
  };
  const onClickAllGenres = () => {
    setIsActive(false);
    setGenresActive(false);
    navigate(`/Home/${pageName}?page=${isCurrentPage}&genre=${"All Genres"}`);
  };
  const titleCategories = isCurrentGenre.replace("%20", " ");
  const sortTitle = sort.includes(".")
    ? sort.charAt(0).toUpperCase() +
      sort.slice(1).split(".")[0] +
      " " +
      sort.split(".")[1]
    : sort.charAt(0).toUpperCase() + sort.slice(1);

  const title = sort === " " ? "Sort" : sortTitle;
  return (
    <div className={styles.root}>
      <span onClick={() => setIsActive(!isActive)} className={styles.blockName}>
        Filters
      </span>
      {isActive && (
        <div className={styles.overlay}>
          <div className="container">
            <button
              onClick={() => setIsActive(false)}
              className={styles.closeBtn}
            >
              <CloseIcon />
            </button>
            <div className={styles.block}>
              <b onClick={onClickCategory} className={styles.filtrTitles}>
                {titleCategories}
              </b>
              {genresActive && (
                <div className={styles.genresBlock}>
                  <ul>
                    {titleCategories === "All Genres" ? (
                      ""
                    ) : (
                      <span onClick={onClickAllGenres}>{"All Genres"}</span>
                    )}

                    {genres.map((obj) => (
                      <li onClick={onClickFilter} key={obj.id}>
                        <Link
                          to={`/Home/${pageName}?page=${isCurrentPage}&genre=${obj.name}`}
                        >
                          {" "}
                          {obj.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <b onClick={onClickSort} className={styles.filtrTitles}>
                {title}
              </b>
              {sortActive && (
                <div className={styles.sortBlock}>
                  <ul>
                    {sortOptions.map((obj, id) => (
                      <li onClick={onClickFilter} key={id}>
                        <Link
                          to={`/Home/${pageName}?page=${isCurrentPage}&genre=${isCurrentGenre}&sortBy=${obj.value}`}
                        >
                          {" "}
                          {obj.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtration;
