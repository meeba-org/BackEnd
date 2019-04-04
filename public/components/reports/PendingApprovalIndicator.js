import Tooltip from "@material-ui/core/Tooltip";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import PropTypes from "prop-types";
import React from "react";
import CSSModules from "react-css-modules";
import {EShiftStatus} from "../../helpers/EShiftStatus";
import styles from "../../styles/Warning.scss";

const PendingApprovalIndicator = ({status, onClick}) => {
    if (status !== EShiftStatus.PENDING)
        return null;

    return (
        <div className={styles["warning"]} onClick={onClick}>
            <Tooltip title={"משמרת ממתינה לאישור"} placement="top">
                <EyeIcon/>
            </Tooltip>
        </div>
    );
};

PendingApprovalIndicator.propTypes = {
    warning: PropTypes.string,
};

export default CSSModules(PendingApprovalIndicator, styles);
