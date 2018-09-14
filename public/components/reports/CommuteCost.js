import React from "react";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import styles from "../../styles/CommuteCost.scss";
import Tooltip from '@material-ui/core/Tooltip';

const CommuteCost = ({data, onClick}) => {
    if (!data)
        return null;

    return (
        <div className={styles["note"]} onClick={onClick}>
            <Tooltip title={
                <div>
                    <div>שעות נסיעה: {data.commuteHours}</div>
                    <div>כמות ק"מ: {data.kmDriving}</div>
                    <div>עלות חניה: {data.parkingCost}</div>
                </div>
            }
            placement="top">
                <DirectionsCarIcon className={styles["icon"]}/>
            </Tooltip>
        </div>
    );
};

export default CommuteCost;
