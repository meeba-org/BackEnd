import Tooltip from "@material-ui/core/Tooltip";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import PropTypes from "prop-types";
import React from "react";
import EShiftStatus from "../../helpers/EShiftStatus";
import "../../styles/PendingApprovalInicator.scss";

const PendingApprovalIndicator = ({shift, onClick, isInnovativeAuthorityEnable}) => {
    const shouldIndicate = shift => {
        let {status, isClockInTimeRetro, isClockOutTimeRetro} = shift;
        
        if (isInnovativeAuthorityEnable && (isClockInTimeRetro || isClockOutTimeRetro))
            return true;
        
        return status === EShiftStatus.APPROVED ||
            status === EShiftStatus.PENDING_UPDATE ||
            status === EShiftStatus.PENDING_CREATE;
    };

    if (!shouldIndicate(shift))
        return null;

    function isApproved() {
        let {status, isClockInTimeRetro, isClockOutTimeRetro} = shift;

        if (isInnovativeAuthorityEnable && (isClockInTimeRetro || isClockOutTimeRetro))
            return true;
        
        // Not IA
        return status === EShiftStatus.APPROVED;
    }

    return (
        <div styleName="icon" onClick={status === EShiftStatus.APPROVED ? null : onClick}>
            <Tooltip title={isApproved() ? "משמרת שאושרה רטרואקטיבית" : "משמרת ממתינה לאישור"} placement="top">
                <EyeIcon styleName={isApproved() ? "approved" : "pending"} />
            </Tooltip>
        </div>
    );
};

PendingApprovalIndicator.propTypes = {
    warning: PropTypes.string,
};

export default PendingApprovalIndicator;
