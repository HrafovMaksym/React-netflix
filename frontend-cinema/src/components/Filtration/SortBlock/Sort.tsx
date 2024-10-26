import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import {
  setSortVisible,
  sortParams,
  sortVisible,
} from "../../../redux/Slices/Filtrarion/Sort";
import { useAppDispatch } from "../../../redux/store";
import {
  category,
  setVisible,
} from "../../../redux/Slices/Filtrarion/Categories";
import { Link } from "react-router-dom";
import { isAllMoviePage } from "../../../redux/Slices/Filtrarion/Pagination";
interface sortProps {
  pageName: string;
}
const Sort: React.FC<sortProps> = ({ pageName }) => {
  const sortOptions = [
    { value: "title.asc", label: "Title (A-Z)" },
    { value: "popularity.desc", label: "Popularity (Desc)" },
    { value: "popularity.asc", label: "Popularity (Asc)" },
    { value: "revenue.desc", label: "Revenue (Desc)" },
  ];
  const dispatch = useAppDispatch();
  const sort = useSelector(sortParams);

  const isCurrentPage = useSelector(isAllMoviePage);
  const isCurrentGenre = useSelector(category);
  const visible = useSelector(sortVisible);
  const [widthBlock, setWidthBlock] = React.useState(0);

  const blockNameRef = React.useRef<HTMLDivElement>(null);
  const currentRef = React.useRef(false);
  const onClickSort = () => {
    dispatch(setVisible(false));

    dispatch(setSortVisible(!visible));
  };
  const onClickVisible = () => {
    dispatch(setVisible(false));
    dispatch(setSortVisible(!visible));
  };
  React.useEffect(() => {
    currentRef.current = true;
    if (currentRef.current && blockNameRef.current) {
      const currentBlockWith = blockNameRef.current.offsetWidth;
      setWidthBlock(currentBlockWith);
    }
  }, [visible]);
  const sortTitle = sort.includes(".")
    ? sort.charAt(0).toUpperCase() +
      sort.slice(1).split(".")[0] +
      " " +
      sort.split(".")[1]
    : sort.charAt(0).toUpperCase() + sort.slice(1);

  const title = sort === " " ? "Sort" : sortTitle;
  return (
    <div className={styles.root}>
      <div
        ref={blockNameRef}
        onClick={onClickVisible}
        className={styles.blockName}
      >
        {title}
      </div>
      {visible && (
        <div style={{ width: widthBlock - 4 }} className={styles.blockInfo}>
          <ul>
            {sortOptions.map((obj, id) => (
              <li key={id} onClick={onClickSort}>
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
  );
};

export default Sort;
