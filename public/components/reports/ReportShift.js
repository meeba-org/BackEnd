import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import {DatePicker, TimePicker} from "@material-ui/pickers";
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {isShiftPending, momentToDay} from "../../helpers/utils";
import "../../styles/ReportShift.scss";
import BusCost from "./BusCost";
import ExtraPay from "./ExtraPay";
import Location from "./Location";
import Note from "./Note";
import PendingApprovalIndicator from "./PendingApprovalIndicator";
import TaskIndicator from "./TaskIndicator";
import Warning from "./Warning";

const ReportShift = (props) => {
    let {showNames, shift, errors, hover, onUpdateStartTime, onUpdateEndTime, onUpdateStartDate, onDelete, showShiftDialog, showLocationModal, isDesktop} = props;

    const calcClockInTime = () => {
        if (isShiftPending(shift) && shift.draftShift?.clockInTime)
            return shift.draftShift.clockInTime;

        return shift.clockInTime;
    };

    const calcClockOutTime = () => {
        if (isShiftPending(shift) && shift.draftShift?.clockOutTime)
            return shift.draftShift.clockOutTime;

        return shift.clockOutTime;
    };

    let clockInTime = calcClockInTime();
    let clockOutTime = calcClockOutTime();
    let hebrewDay = momentToDay(clockInTime);

    return (
        <div styleName="line">
            {showNames &&
            <div styleName="name-container">
                <div styleName="name">{shift.user && shift.user.fullName}</div>
            </div>
            }

            <div styleName="shift-members">
                <div styleName="date">
                    <div styleName="hebrew-day">{hebrewDay}'</div>

                    <DatePicker autoOk onChange={(date) => onUpdateStartDate(date, shift)}
                                value={clockInTime}
                                format="DD/MM/YYYY"
                                style={{margin: "0 10px 0 0"}}
                                inputProps={{"data-hj-whitelist": true}}
                    />
                </div>

                <TimePicker
                    styleName="time"
                    ampm={false}
                    autoOk
                    value={clockInTime}
                    onChange={(time) => onUpdateStartTime(time, shift)}
                    inputProps={{"data-hj-whitelist": true}}
                />

                <TimePicker
                    styleName="time"
                    ampm={false}
                    autoOk
                    value={clockOutTime}
                    onChange={(time) => onUpdateEndTime(time, shift)}
                    inputProps={{"data-hj-whitelist": true}}
                />
            </div>
            {isDesktop &&
                <Fragment>
                    <Warning warning={errors}/>
                    <PendingApprovalIndicator status={shift.status} onClick={showShiftDialog}/>
                    <Note text={shift.note} onClick={showShiftDialog}/>
                    <BusCost data={shift.commuteCost} onClick={showShiftDialog}/>
                    <Location location={shift.location} onClick={showLocationModal} />
                    <ExtraPay extraPay={shift.extraPay} onClick={showShiftDialog}/>
                    <TaskIndicator task={shift.task} onClick={showShiftDialog}/>
                 </Fragment>
            }
            {hover && isDesktop &&
            <div>
                <Tooltip title="עריכה" placement="top">
                    <IconButton styleName="elem" onClick={showShiftDialog}><Edit/></IconButton>
                </Tooltip>
                <Tooltip title="מחיקה" placement="top">
                    <IconButton styleName="elem" onClick={onDelete}><Delete/></IconButton>
                </Tooltip>
            </div>
            }
            {!isDesktop &&
                <div styleName="mobile-controls">
                    <Button variant={"contained"} styleName={"mobile-button delete"} onClick={onDelete}><Delete/></Button>
                </div>
            }
        </div>
    );
};

ReportShift.propTypes = {
    showNames: PropTypes.bool.isRequired,
    shift: PropTypes.object.isRequired,
    errors: PropTypes.string,
    hover: PropTypes.bool.isRequired,
    onUpdateStartDate: PropTypes.func.isRequired,
    onUpdateStartTime: PropTypes.func.isRequired,
    onUpdateEndTime: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
};
ReportShift.defaultProps = {};

export default ReportShift;
