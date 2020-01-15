import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import CommentIcon from '@material-ui/icons/Comment';
import PropTypes from "prop-types";
import React from "react";
import "../../styles/ShiftIndicator.scss";

const Note = ({text, onClick}) => {
    if (!text)
        return null;

    return (
        <div styleName="shift-indicator" onClick={onClick}>
            <Tooltip title={text} placement="top">
                <IconButton styleName="icon" onClick={onClick}><CommentIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

Note.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
};

export default Note;
