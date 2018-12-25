import React from "react";
import Place from '@material-ui/icons/Place';
import styles from "../../styles/CommuteCost.scss";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

const Location = ({data, onClick}) => {
    // if (!data)
    //     return null;

    return (
        <div className={styles["commute"]}>
            <Tooltip title={"בקרוב... מיקום תחילת משמרת!"} placement="top">
                <IconButton className={styles["icon"]} onClick={onClick}><Place/></IconButton>
            </Tooltip>
        </div>
    );
};

Location.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
};

export default Location;
