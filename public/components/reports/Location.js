import styles from "../../styles/CommuteCost.scss";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PlaceIcon from "@material-ui/icons/Place";
import React from "react";
import PropTypes from "prop-types";

const Location = ({location, onClick}) => {
    if (!location)
        return null;

    return (
        <div className={styles["commute"]}>
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

