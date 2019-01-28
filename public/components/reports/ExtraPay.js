import styles from "../../styles/CommuteCost.scss";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ExtraPayIcon from "@material-ui/icons/CardGiftcard";
import React from "react";
import PropTypes from "prop-types";

const ExtraPay = ({extraPay, onClick}) => {
    if (!extraPay)
        return null;

    return (
        <div className={styles["shift-icon"]}>
            <Tooltip
                title={<div>תוספת תשלום: {extraPay} ש"ח</div>}
                placement="top">
                <IconButton className={styles["icon"]} onClick={onClick}><ExtraPayIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

ExtraPay.propTypes = {
    extraPay: PropTypes.object,
    onClick: PropTypes.func,
};

export default ExtraPay;

