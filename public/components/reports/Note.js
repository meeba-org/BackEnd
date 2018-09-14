import React from "react";
import CommentIcon from '@material-ui/icons/Comment';
import styles from "../../styles/Note.scss";
import Tooltip from '@material-ui/core/Tooltip';

const Note = ({text, onClick}) => {
    if (!text)
        return null;

    return (
        <div className={styles["note"]} onClick={onClick}>
            <Tooltip title={text} placement="top">
                <CommentIcon className={styles["icon"]}/>
            </Tooltip>
        </div>
    );
};

export default Note;
