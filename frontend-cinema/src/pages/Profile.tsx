import React from "react";

import styles from "../scss/modules/profile.module.scss";

import EditIcon from "@mui/icons-material/Edit";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import { useSelector } from "react-redux";
import { fetchAccParams } from "../redux/Slices/auth";

import { Link } from "react-router-dom";
import Avatar from "../components/UserProfile/Avatar";

const Profile: React.FC = () => {
  const userInfo = useSelector(fetchAccParams);
  const [isVisible, setIsVisible] = React.useState(false);
  const [submitPass, setSubmitPass] = React.useState(false);
  const [value, setValue] = React.useState("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onClickConfirm = () => {
    let answer = Boolean(value === userInfo.password);
    if (answer === true) {
      setIsVisible(true);
      setSubmitPass(false);
    } else {
      alert("password incorrect");
      setSubmitPass(false);
      setValue("");
    }
  };

  const onClickCheck = () => {
    setSubmitPass(!submitPass);
  };

  return (
    <div className={styles.root}>
      <div className="container">
        <h2 className={styles.title}>Account information</h2>
        <div className={styles.public}>
          <h2 className={styles.titlePublic}>Public information</h2>
          <div className={styles.flexPublic}>
            <div className={styles.textFlex}>
              <Avatar />
              {/* <div className={styles.avatarEdit}>
                <PersonIcon className={styles.avatar} />
                <button>
                  <input type="file" hidden />
                  <EditIcon />
                </button>
              </div> */}
              <div className={styles.textPublic}>
                <span>Username</span>
                <h2>
                  {userInfo.name}{" "}
                  <button>
                    <EditIcon />
                  </button>
                </h2>
              </div>
            </div>
            <Link to={"/Home/Mylist"}>
              {window.innerWidth > 525 ? (
                "My watch list on Netflix"
              ) : (
                <PlaylistAddCheckCircleIcon />
              )}
            </Link>
          </div>
        </div>

        <div className={styles.private}>
          <div className={styles.flexPrivate}>
            <h2 className={styles.titlePublic}>Private information</h2>
            <button>Edit</button>
          </div>
          <h3>Email address: {userInfo.email}</h3>
          <h3 className={styles.password}>
            Password:{" "}
            <button onClick={onClickCheck} className={styles.seePass}>
              ?
            </button>
            {submitPass && (
              <div className={styles.sumbitPass}>
                <p>To see your password, you need to confirm it</p>
                <input onChange={onChangeInput} value={value} type="text" />
                <button onClick={onClickConfirm}>Confirm</button>
              </div>
            )}
            <input
              type={isVisible ? "text" : "password"}
              value={userInfo.password}
            />{" "}
          </h3>
          <h3>Gender: Not specified</h3>
          <h3>Preferred language: English</h3>
          <h3>Country/Region: Austria</h3>
          <h3>Date of birth: Not specified</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
