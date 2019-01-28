import React from "react";
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import styles from "../../styles/CommuteCost.scss";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import {isBusCostEmpty} from "../../helpers/utils";
import PropTypes from "prop-types";

const BusCost = ({data, onClick}) => {
    if (!data || isBusCostEmpty(data))
        return null;

    return (
        <div className={styles["commute"]}>
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
