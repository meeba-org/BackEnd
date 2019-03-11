import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import LabelIcon from "@material-ui/icons/Label";
import PropTypes from "prop-types";
import React from "react";
import CSSModules from "react-css-modules";
import styles from "../../styles/CommuteCost.scss";

const TaskIndicator = ({task, onClick}) => {
    if (!task || !task.title)
        return null;

    return (
        <div className={styles["shift-indicator"]} onClick={onClick}>
            <Tooltip title={task.title} placement="top">
                <IconButton className={styles["icon"]} onClick={onClick}><LabelIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

TaskIndicator.propTypes = {
    task: PropTypes.object,
    onClick: PropTypes.func,
};

export default CSSModules(TaskIndicator, styles);

