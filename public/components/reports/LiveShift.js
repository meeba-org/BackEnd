import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Home from '@material-ui/icons/Home';
import {TimePicker} from "@material-ui/pickers";
import PropTypes from 'prop-types';
import React from 'react';
import {isWorking} from "../../helpers/utils";
import "./styles/LiveShift.scss";
import BusCost from "./BusCost";
import ExtraPay from "./ExtraPay";
import Location from "./Location";
import Note from "./Note";
import TaskIndicator from "./TaskIndicator";
import Warning from "./Warning";

const LiveShift = ({shift, errors, hover, onUpdateStartTime, onUpdateEndTime, onDelete, onShiftComplete, showShiftDialog, showLocationModal, isDesktop}) => {

    return (
        <div styleName="line">
            <div styleName="name-container">
                <Tooltip title={shift?.user?.fullName} placement="top">
                    <div styleName="name">{shift?.user?.fullName}</div>
                </Tooltip>
            </div>

            <div styleName="shift-members">
                <TimePicker
                    styleName="time"
                    ampm={false}
                    autoOk
                    value={shift.clockInTime}
                    onChange={(time) => onUpdateStartTime(time, shift)}
                    inputProps={{"data-hj-whitelist": ""}}
                />

                {!!shift.clockOutTime &&
                <TimePicker
                    styleName="time"
                    ampm={false}
                    autoOk
                    value={shift.clockOutTime}
                    onChange={(time) => onUpdateEndTime(time, shift)}
                    inputProps={{"data-hj-whitelist": ""}}
                />
                }
                {isWorking(shift) &&
                    <Button variant="outlined" styleName="elem home" onClick={() => onShiftComplete(shift)}><Home/></Button>
                }
            </div>
            <Warning warning={errors}/>
            <Note text={shift.note} onClick={showShiftDialog}/>
            {/*<CarCost data={shift.commuteCost} onClick={showShiftDialog}/>*/}
            <BusCost data={shift.commuteCost} onClick={showShiftDialog}/>
            <Location location={shift.location} onClick={showLocationModal} isClockInInsideWorkplace={shift.isClockInInsideWorkplace} />
            <ExtraPay extraPay={shift.extraPay} onClick={showShiftDialog}/>
            <TaskIndicator task={shift.task} onClick={showShiftDialog}/>

            {hover && isDesktop &&
            <div>
                <Tooltip title="עריכה" placement="left">
                    <IconButton styleName="elem" onClick={showShiftDialog}><Edit/></IconButton>
                </Tooltip>
                <Tooltip title="מחיקה" placement="left">
                    <IconButton styleName="elem" onClick={onDelete}><Delete/></IconButton>
                </Tooltip>
            </div>
            }
            {!isDesktop &&
                <div styleName="mobile-controls">
                    <IconButton styleName={"mobile-button delete"} onClick={onDelete}><Delete/></IconButton>
                </div>
            }
        </div>
    );
};

LiveShift.propTypes = {
    shift: PropTypes.object.isRequired,
    errors: PropTypes.string,
    hover: PropTypes.bool.isRequired,
    onUpdateStartTime: PropTypes.func.isRequired,
    onUpdateEndTime: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onShiftComplete: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    showLocationModal: PropTypes.func.isRequired,
};
LiveShift.defaultProps = {};

export default LiveShift;
