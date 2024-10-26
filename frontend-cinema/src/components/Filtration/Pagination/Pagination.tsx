import React from "react";
import styles from "./styles.module.scss";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link, useNavigate } from "react-router-dom";
import {
  isAllMoviePage,
  lastPageAllMovies,
} from "../../../redux/Slices/Filtrarion/Pagination";
import { useSelector } from "react-redux";
import { GenerationPages } from "../../../utils/PageGeneration";
import { category } from "../../../redux/Slices/Filtrarion/Categories";
import { sortParams } from "../../../redux/Slices/Filtrarion/Sort";
interface PaginationProps {
  pageName: string;
}
const Pagination: React.FC<PaginationProps> = ({ pageName }) => {
  const isCurrentPage = useSelector(isAllMoviePage);
  const lastPage = useSelector(lastPageAllMovies);
  const isCurrentGenre = useSelector(category);
  const sort = useSelector(sortParams);
  const navigate = useNavigate();
  const pages = GenerationPages();

  const onClickNextPage = () => {
    navigate(
      `/Home/${pageName}?page=${
        isCurrentPage + 1
      }&genre=${isCurrentGenre}&sortBy=${sort}`
    );
  };
  const onClickPerPage = () => {
    navigate(
      `/Home/${pageName}?page=${
        isCurrentPage - 1
      }&genre=${isCurrentGenre}&sortBy=${sort}`
    );
  };
  const onClickFirstPage = () => {
    navigate(
      `/Home/${pageName}?page=${1}&genre=${isCurrentGenre}&sortBy=${sort}`
    );
  };
  const onClickLastPage = () => {
    navigate(
      `/Home/${pageName}?page=${500}&genre=${isCurrentGenre}&sortBy=${sort}`
    );
  };
  return (
    <div className={styles.root}>
      <button
        onClick={onClickPerPage}
        disabled={isCurrentPage === 1}
        className={styles.arrows}
      >
        <KeyboardArrowLeftIcon />
      </button>
      <button
        className={`${styles.firstBtn} ${
          isCurrentPage >= 20 ? styles.NoneActiveFirstBtn : ""
        }`}
        onClick={onClickFirstPage}
      >
        {1}
      </button>
      <span
        className={`${styles.firstBtnMore} ${
          isCurrentPage >= 20 ? styles.NoneActiveFirstBtn : ""
        }`}
      >
        {" "}
        ...{" "}
      </span>
      {pages.map((el, id) => (
        <div key={id}>
          <Link
            to={`/Home/${pageName}?page=${el}&genre=${isCurrentGenre}&sortBy=${sort}`}
            className={isCurrentPage === el ? styles.pageActive : ""}
          >
            {el}
          </Link>
        </div>
      ))}
      <span
        className={`${styles.moreBtns} ${
          isCurrentPage >= 491 ? styles.activeLastBtn : ""
        }`}
      >
        {" "}
        ...{" "}
      </span>
      <button
        className={`${styles.lastBtn} ${
          isCurrentPage >= 491 ? styles.activeLastBtn : ""
        }`}
        onClick={onClickLastPage}
      >
        {lastPage}
      </button>
      <button
        onClick={onClickNextPage}
        disabled={isCurrentPage === lastPage}
        className={styles.arrows}
      >
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
