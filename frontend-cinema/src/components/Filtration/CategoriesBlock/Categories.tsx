import React from "react";

import styles from "./CategoriesStyles.module.scss";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import {
  category,
  isVisible,
  setCategory,
  setVisible,
} from "../../../redux/Slices/Filtrarion/Categories";
import { Link, useNavigate } from "react-router-dom";
import { isAllMoviePage } from "../../../redux/Slices/Filtrarion/Pagination";
import { setSortVisible } from "../../../redux/Slices/Filtrarion/Sort";
interface categoriesProps {
  pageName: string;
  genres: {
    id: string;
    name: string;
  }[];
}
const Categories: React.FC<categoriesProps> = ({ pageName, genres }) => {
  const dispatch = useAppDispatch();
  const isCurrentPage = useSelector(isAllMoviePage);
  const visible = useSelector(isVisible);
  const categories = useSelector(category);

  const navigate = useNavigate();
  const blockNameRef = React.useRef<HTMLDivElement>(null);
  const currentRef = React.useRef(false);
  const onClickVisible = () => {
    dispatch(setVisible(!visible));
    dispatch(setSortVisible(false));
  };
  const onClickCategory = () => {
    dispatch(setVisible(!visible));
    dispatch(setSortVisible(false));
  };
  const onClickAllGenres = () => {
    navigate(`/Home/${pageName}?page=${isCurrentPage}&genre=${"All Genres"}`);
    dispatch(setVisible(!visible));
    dispatch(setSortVisible(false));
  };
  const titleCategories = categories.replace("%20", " ");
  return (
    <div className={styles.root}>
      <div
        ref={blockNameRef}
        onClick={onClickVisible}
        className={styles.blockName}
      >
        {titleCategories}
        {visible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      {visible && (
        <div className={styles.blockCategories}>
          <h3 onClick={onClickAllGenres} className={styles.titleBlock}>
            All Genres
          </h3>
          <ul>
            {genres.map((obj) => (
              <li onClick={onClickCategory} key={obj.id}>
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
    </div>
  );
};

export default Categories;
