import React from "react";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import styles from "../../styles/CommuteCost.scss";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import {isCarCostEmpty} from "../../helpers/utils";
import PropTypes from "prop-types";

const CarCost = ({data, onClick}) => {
    if (!data || isCarCostEmpty(data))
        return null;

    return (
        <div className={styles["commute"]}>
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
