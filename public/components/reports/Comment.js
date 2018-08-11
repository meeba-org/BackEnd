import React from "react";
import CommentIcon from '@material-ui/icons/Comment';
import styles from "../../styles/Comment.scss";

const Comment = ({description}) => {
    if (!description)
        return null;

    return (
        <div className={styles["comment"]}>
            <CommentIcon className={styles["icon"]} />
            <div>{description}</div>
        </div>
    );
};

export default Comment
