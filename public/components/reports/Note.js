import React from "react";
import CommentIcon from '@material-ui/icons/Comment';
import styles from "../../styles/Note.scss";

const Note = ({text}) => {
    if (!text)
        return null;

    return (
        <div className={styles["note"]}>
            <CommentIcon className={styles["icon"]} />
            <div>{text}</div>
        </div>
    );
};

export default Note
