import React from "react";

import styles from "./CommentsStyles.module.scss";

import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Comments: React.FC = () => {
  return (
    <div>
      <form>
        <div className={styles.BlockComment}>
          <input
            className={styles.inputComment}
            placeholder="Type Comment"
            type="text"
          />
          <button type="submit" className={styles.btnSend}>
            <SendIcon />
          </button>
        </div>
      </form>
      <div className={styles.comment}>
        <AccountCircleIcon />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, autem.
        </p>
      </div>
      <div className={styles.comment}>
        <AccountCircleIcon />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, autem.
        </p>
      </div>
    </div>
  );
};

export default Comments;
