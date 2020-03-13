import Tooltip from "@material-ui/core/Tooltip";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import PropTypes from "prop-types";
import React from "react";
import EShiftStatus from "../../helpers/EShiftStatus";
import "../../styles/PendingApprovalInicator.scss";

const PendingApprovalIndicator = ({status, onClick}) => {
    const shouldIndicate = status =>
        status === EShiftStatus.APPROVED ||
        status === EShiftStatus.PENDING_UPDATE ||
        status === EShiftStatus.PENDING_CREATE;

    if (!shouldIndicate(status))
        return null;

    return (
        <div styleName="icon" onClick={onClick}>
            <Tooltip title={"משמרת ממתינה לאישור"} placement="top">
                <EyeIcon styleName={status === EShiftStatus.APPROVED ? "approved" : "pending"} />
            </Tooltip>
        </div>
    );
};

PendingApprovalIndicator.propTypes = {
    warning: PropTypes.string,
};

export default PendingApprovalIndicator;
