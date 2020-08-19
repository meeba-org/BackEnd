import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ExtraPayIcon from "@material-ui/icons/CardGiftcard";
import PropTypes from "prop-types";
import React from "react";
import "./styles/ShiftIndicator.scss";

const ExtraPay = ({extraPay, onClick}) => {
    if (!extraPay)
        return null;

    return (
        <div styleName="shift-indicator">
            <Tooltip
                title={<div>תוספת תשלום: {extraPay} ש"ח</div>}
                placement="top">
                <IconButton styleName="icon" onClick={onClick}><ExtraPayIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

ExtraPay.propTypes = {
    extraPay: PropTypes.number,
    onClick: PropTypes.func,
};

export default ExtraPay;

