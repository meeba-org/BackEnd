import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ExtraPayIcon from "@material-ui/icons/CardGiftcard";
import PropTypes from "prop-types";
import React from "react";
import CSSModules from "react-css-modules";
import styles from "../../styles/ShiftIndicator.scss";

const ExtraPay = ({extraPay, onClick}) => {
    if (!extraPay)
        return null;

    return (
        <div className={styles["shift-indicator"]}>
            <Tooltip
                title={<div>תוספת תשלום: {extraPay} ש"ח</div>}
                placement="top">
                <IconButton className={styles["icon"]} onClick={onClick}><ExtraPayIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

ExtraPay.propTypes = {
    extraPay: PropTypes.number,
    onClick: PropTypes.func,
};

export default CSSModules(ExtraPay, styles);

