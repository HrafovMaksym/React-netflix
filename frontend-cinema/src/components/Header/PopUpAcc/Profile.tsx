import React from "react";
import { fetchAccParams, setLogout } from "../../../redux/Slices/auth";

import { useAppDispatch } from "../../../redux/store";

import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import styles from "./ProfileStyles.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accProps = useSelector(fetchAccParams);

  const onClickLogout = () => {
    dispatch(setLogout());

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");

    if (location.pathname !== "/") {
      navigate("/");
    }
  };
  const divRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const json = JSON.stringify(accProps);
    localStorage.setItem("user", json);
    if (accProps.avatar !== accProps.avatar) {
      const data = localStorage.getItem("user");
      const name = data
        ? JSON.parse(data)
        : {
            name: "",
            email: "",
            password: "",
            avatar: "",
          };
      const answer = JSON.stringify(name);
      localStorage.setItem("user", answer);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !event.composedPath().includes(divRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [accProps.avatar]);

  return (
    <div ref={divRef} className={styles.root}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.userBtn}>
        {accProps.avatar ? (
          <img
            className={styles.userAvatar}
            src={`http://localhost:5555${accProps.avatar}`}
            alt="Upload"
          />
        ) : (
          <PersonIcon />
        )}
        <span>
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      {isOpen && (
        <div className={styles.userBlock}>
          <ul>
            <div className={styles.profileEdits}>
              <li>{accProps.name}</li>
              <span>|</span>
              <li onClick={onClickLogout}>Logout</li>
            </div>
            <Link to={"/Home/Profile/Edit"}>
              <li>Edit</li>
            </Link>
            <Link to={"/auth/edit"}>
              <li>List</li>
            </Link>
            <Link to={"/auth/edit"}>
              <li>Subscribes</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
