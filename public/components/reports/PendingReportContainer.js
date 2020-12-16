import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {showApproveAllShiftsModal, fetchPendingShifts, showDeleteShiftModal, updateShift} from "../../actions";
import {getPendingShifts} from "../../selectors";
import PendingReport from "./PendingReport";

const PendingReportContainer = ({updateShift, showDeleteShiftModal, shifts, isLoading, fetchPendingShifts, showApproveAllShiftsModal}) => {

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
            onApproveAll={() => showApproveAllShiftsModal(shifts)}
        />
    );
};

const mapStateToProps = state => ({
    shifts: getPendingShifts(state),
});

const mapDispatchToProps = {
    fetchPendingShifts,
    showApproveAllShiftsModal,
    showDeleteShiftModal,
    updateShift,
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingReportContainer);
