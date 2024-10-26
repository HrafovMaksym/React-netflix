import { useSelector } from "react-redux";
import {
  isAllMoviePage,
  lastPageAllMovies,
  visiblePages,
} from "../redux/Slices/Filtrarion/Pagination";
import React from "react";

export const GenerationPages = () => {
  const isCurrentPage = useSelector(isAllMoviePage);
  const [isTotalVisiblePages, setIsTotalVisiblePages] = React.useState(3);
  React.useEffect(() => {
    const updateVisiblePages = () => {
      if (window.innerWidth > 840) {
        setIsTotalVisiblePages(10);
      } else if (window.innerWidth > 625) {
        setIsTotalVisiblePages(5);
      } else {
        setIsTotalVisiblePages(3);
      }
    };
    updateVisiblePages();

    window.addEventListener("resize", updateVisiblePages);

    return () => {
      window.removeEventListener("resize", updateVisiblePages);
    };
  }, []);

  const lastPage = useSelector(lastPageAllMovies);
  let startPage, endPage;
  if (isCurrentPage <= isTotalVisiblePages) {
    startPage = 1;
    endPage = isTotalVisiblePages;
  } else if (isCurrentPage >= lastPage - isTotalVisiblePages + 1) {
    startPage = lastPage - isTotalVisiblePages + 1;
    endPage = lastPage;
  } else {
    startPage = isCurrentPage - Math.floor(isTotalVisiblePages / 2);
    endPage = startPage + isTotalVisiblePages - 1;
  }
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
};
