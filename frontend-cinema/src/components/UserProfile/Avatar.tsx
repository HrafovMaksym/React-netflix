import React, { useRef } from "react";
import styles from "./styles.module.scss";

import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../../axiosConfig/axios";
import { useAppDispatch } from "../../redux/store";
import { fetchAccParams, setImageUser } from "../../redux/Slices/auth";
import { useSelector } from "react-redux";

const Avatar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(fetchAccParams);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState("");
  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  const handleFileChange = async (e: any) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post(`/upload`, formData);
      setImage(data.url);
      dispatch(setImageUser(data.url));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.avatarEdit}>
      {user.avatar ? (
        <img
          className={styles.userAvatar}
          src={`http://localhost:5555${user.avatar}`}
          alt="Upload"
        />
      ) : (
        <PersonIcon className={styles.avatar} />
      )}
      <button className={styles.edit} onClick={handleClick}>
        <input
          onChange={handleFileChange}
          ref={inputFileRef}
          type="file"
          hidden
        />
        <EditIcon />
      </button>
    </div>
  );
};

export default Avatar;
