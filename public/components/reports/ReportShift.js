import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {momentToDay} from "../../helpers/utils";
import styles from "../../styles/ReportShift.scss";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DatePicker from "material-ui-pickers/DatePicker";
import TimePicker from "material-ui-pickers/TimePicker";
import Note from "./Note";
import CarCost from "./CarCost";
import Warning from "./Warning";
import BusCost from "./BusCost";
import Location from "./Location";

const ReportShift = (props) => {
    let {showNames, shift, errors, hover, onUpdateStartTime, onUpdateEndTime, onUpdateStartDate, onDelete, showShiftDialog, showLocationModal, isDesktop} = props;
    let hebrewDay = momentToDay(shift.clockInTime);

    return (
        <Fragment>
            {showNames &&
            <div className={styles["name-container"]}>
                <div className={styles["name"]}>{shift.user && shift.user.fullName}</div>
            </div>
            }

            <div className={styles["shift-members"]}>
                <div className={styles["date"]}>
                    <div className={styles["hebrew-day"]}>{hebrewDay}'</div>

                    <DatePicker autoOk onChange={(date) => onUpdateStartDate(date, shift)}
                                value={shift.clockInTime}
                                format="DD/MM/YYYY"
                                style={{margin: "0 10px 0 0"}}
                                disableFuture
                    />
                </div>

                <TimePicker
                    className={styles["time"]}
                    ampm={false}
                    autoOk
                    value={shift.clockInTime}
                    onChange={(time) => onUpdateStartTime(time, shift)}
                />

                <TimePicker
                    className={styles["time"]}
                    ampm={false}
                    autoOk
                    value={shift.clockOutTime}
                    onChange={(time) => onUpdateEndTime(time, shift)}
                />
            </div>
            {isDesktop &&
                <Fragment>
                    <Warning warning={errors}/>
                    <Note text={shift.note} onClick={showShiftDialog}/>
                    <CarCost data={shift.commuteCost} onClick={showShiftDialog}/>
                    <BusCost data={shift.commuteCost} onClick={showShiftDialog}/>
                    <Location location={shift.location} onClick={showLocationModal} />
                 </Fragment>
            }
            {hover && isDesktop &&
            <div>
                <Tooltip title="עריכה" placement="top">
                    <IconButton className={styles["elem"]} onClick={showShiftDialog}><Edit/></IconButton>
                </Tooltip>
                <Tooltip title="מחיקה" placement="top">
                    <IconButton className={styles["elem"]} onClick={onDelete}><Delete/></IconButton>
                </Tooltip>
            </div>
            }
        </Fragment>
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
