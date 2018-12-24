import styles from "../../styles/CommuteCost.scss";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DirectionsBusIcon from "@material-ui/icons/Map";
import React from "react";
import PropTypes from "prop-types";

const Map = ({data: location, onClick}) => {
    if (!location)
        return null;

    return (
        <div className={styles["commute"]}>
            <Tooltip title="מיקום בזמן כניסה למשמרת" placement="top">
                <IconButton className={styles["icon"]} onClick={onClick}><DirectionsBusIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

Map.propTypes = {
    location: PropTypes.object,
    onClick: PropTypes.func,
};

export default Map;

