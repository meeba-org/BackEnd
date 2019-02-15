import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import PropTypes from "prop-types";
import React from "react";
import {isCarCostEmpty} from "../../helpers/utils";
import styles from "../../styles/CommuteCost.scss";

const CarCost = ({data, onClick}) => {
    if (!data || isCarCostEmpty(data))
        return null;

    return (
        <div className={styles["shift-indicator"]}>
            <Tooltip title={
                <div>
                    <div>שעות נסיעה: {data.commuteHours}</div>
                    <div>כמות ק"מ: {data.kmDriving}</div>
                    <div>עלות חניה: {data.parkingCost}</div>
                </div>
            }
            placement="top">
                <IconButton className={styles["icon"]} onClick={onClick}><DirectionsCarIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

CarCost.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
};

export default CarCost;
