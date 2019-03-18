import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import PropTypes from "prop-types";
import React from "react";
import {isBusCostEmpty} from "../../helpers/utils";
import styles from "../../styles/ShiftIndicator.scss";

const BusCost = ({data, onClick}) => {
    if (!data || isBusCostEmpty(data))
        return null;

    return (
        <div className={styles["shift-indicator"]}>
            <Tooltip title={
                <div>
                    <div>החזר נסיעות: {data.publicTransportation} ש"ח</div>
                </div>
            }
            placement="top">
                <IconButton className={styles["icon"]} onClick={onClick}><DirectionsBusIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

BusCost.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
};

export default BusCost;
