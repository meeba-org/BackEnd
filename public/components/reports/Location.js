import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PlaceIcon from "@material-ui/icons/Place";
import PropTypes from "prop-types";
import React from "react";
import styles from "../../styles/CommuteCost.scss";

const Location = ({location, onClick}) => {
    if (!location)
        return null;

    return (
        <div className={styles["shift-indicator"]}>
            <Tooltip title="מיקום בזמן כניסה למשמרת" placement="top">
                <IconButton className={styles["icon"]} onClick={onClick}><PlaceIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

Location.propTypes = {
    location: PropTypes.object,
    onClick: PropTypes.func,
};

export default Location;

