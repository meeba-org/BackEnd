import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Home from '@material-ui/icons/Home';
import Work from '@material-ui/icons/Work';
import TimePicker from "material-ui-pickers/TimePicker";
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {isWorking} from "../../helpers/utils";
import styles from "../../styles/LiveShift.scss";
import BusCost from "./BusCost";
import ExtraPay from "./ExtraPay";
import Location from "./Location";
import Note from "./Note";
import TaskIndicator from "./TaskIndicator";
import Warning from "./Warning";

const LiveShift = (props) => {
    let {showNames, shift, errors, hover, onUpdateStartTime, onUpdateEndTime, onDelete, onShiftComplete, showShiftDialog, showLocationModal, isDesktop} = props;
    let icon = isWorking(shift) ?
        <Tooltip title="בעבודה" placement="right"><Work/></Tooltip> :
        <Tooltip title="בבית" placement="right"><Home/></Tooltip>;

    return (
        <div className={styles["line"]}>
            <div className={styles["name-container"]}>
                <IconButton className={styles["icon"]}>{icon}</IconButton>
                {showNames &&
                <div className={styles["name"]}>{shift.user && shift.user.fullName}</div>
                }
            </div>

            <div className={styles["shift-members"]}>
                <TimePicker
                    className={styles["time"]}
                    ampm={false}
                    autoOk
                    value={shift.clockInTime}
                    onChange={(time) => onUpdateStartTime(time, shift)}
                />

                {!!shift.clockOutTime &&
                <TimePicker
                    className={styles["time"]}
                    ampm={false}
                    autoOk
                    value={shift.clockOutTime}
                    onChange={(time) => onUpdateEndTime(time, shift)}
                />
                }
            </div>
            <Warning warning={errors}/>
            <Note text={shift.note} onClick={showShiftDialog}/>
            {/*<CarCost data={shift.commuteCost} onClick={showShiftDialog}/>*/}
            <BusCost data={shift.commuteCost} onClick={showShiftDialog}/>
            <Location location={shift.location} onClick={showLocationModal} />
            <ExtraPay extraPay={shift.extraPay} onClick={showShiftDialog}/>
            <TaskIndicator task={shift.task} onClick={showShiftDialog}/>

            {hover && isDesktop &&
            <div>
                {isWorking(shift) &&
                <Tooltip title="סיים משמרת" placement="left">
                    <IconButton className={styles["elem"]} onClick={() => onShiftComplete(shift)}><Home/></IconButton>
                </Tooltip>
                }
                <Tooltip title="עריכה" placement="left">
                    <IconButton className={styles["elem"]} onClick={showShiftDialog}><Edit/></IconButton>
                </Tooltip>
                <Tooltip title="מחיקה" placement="left">
                    <IconButton className={styles["elem"]} onClick={onDelete}><Delete/></IconButton>
                </Tooltip>
            </div>
            }
            {!isDesktop && isWorking(shift) &&
                <div className={styles["controls"]}>
                    <Button variant={"raised"} className={styles["mobile-button"]} onClick={() => onShiftComplete(shift)}><Home/></Button>
                </div>
            }
        </div>
    );
};

LiveShift.propTypes = {
    showNames: PropTypes.bool.isRequired,
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
