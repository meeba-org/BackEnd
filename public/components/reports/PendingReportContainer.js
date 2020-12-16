import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {approveShifts, fetchPendingShifts, showDeleteShiftModal, updateShift} from "../../actions";
import {getPendingShifts} from "../../selectors";
import PendingReport from "./PendingReport";

const PendingReportContainer = ({updateShift, showDeleteShiftModal, shifts, isLoading, fetchPendingShifts, approveShifts}) => {

    useEffect(() => {
        fetchPendingShifts();
    }, []);
    
    return (
        <PendingReport
            shifts={shifts}
            onDeleteShift={showDeleteShiftModal}
            onUpdateShift={updateShift}
            isLoading={isLoading}
            onRefresh={fetchPendingShifts}
            postUpdate={fetchPendingShifts}
            onApproveAll={() => approveShifts(shifts)}
        />
    );
};

const mapStateToProps = state => ({
    shifts: getPendingShifts(state),
});

const mapDispatchToProps = {
    fetchPendingShifts,
    approveShifts,
    showDeleteShiftModal,
    updateShift,
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingReportContainer);
