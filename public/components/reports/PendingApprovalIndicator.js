import Tooltip from "@material-ui/core/Tooltip";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import PropTypes from "prop-types";
import React from "react";
import EShiftStatus from "../../helpers/EShiftStatus";
import styles from "../../styles/PendingApprovalInicator.scss";

const PendingApprovalIndicator = ({status, onClick}) => {
    if (status !== EShiftStatus.PENDING_UPDATE && status !== EShiftStatus.PENDING_CREATE)
        return null;

    return (
        <div className={styles["pending"]} onClick={onClick}>
            <Tooltip title={"משמרת ממתינה לאישור"} placement="top">
                <EyeIcon/>
            </Tooltip>
        </div>
    );
};

PendingApprovalIndicator.propTypes = {
    warning: PropTypes.string,
};

export default PendingApprovalIndicator;
