import React from "react";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import styles from "../../styles/CommuteCost.scss";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import {isCommuteCostEmpty} from "../../helpers/utils";

const CommuteCost = ({data, onClick}) => {
    if (!data || isCommuteCostEmpty(data))
        return null;

    return (
        <div className={styles["note"]}>
            <Tooltip title={
                <div>
                    <div>תחבורה ציבורית: {data.publicTransportation}</div>
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

export default CommuteCost;
