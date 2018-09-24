import React from "react";
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import styles from "../../styles/CommuteCost.scss";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import {isBusCostEmpty} from "../../helpers/utils";

const BusCost = ({data, onClick}) => {
    if (!data || isBusCostEmpty(data))
        return null;

    return (
        <div className={styles["note"]}>
            <Tooltip title={
                <div>
                    <div>תחבורה ציבורית: {data.publicTransportation}</div>
                </div>
            }
            placement="top">
                <IconButton className={styles["icon"]} onClick={onClick}><DirectionsBusIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

export default BusCost;
