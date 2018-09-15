import React from "react";
import CommentIcon from '@material-ui/icons/Comment';
import styles from "../../styles/Note.scss";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";

const Note = ({text, onClick}) => {
    if (!text)
        return null;

    return (
        <div className={styles["note"]} onClick={onClick}>
            <Tooltip title={text} placement="top">
                <IconButton className={styles["icon"]} onClick={onClick}><CommentIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

export default Note;
