import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {momentToDay} from "../../helpers/utils";
import styles from "../../styles/ReportShift.scss";
import Delete from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DatePicker from "material-ui-pickers/DatePicker";
import TimePicker from "material-ui-pickers/TimePicker";
import Comment from "./Comment";
import Warning from "./Warning";

const ReportShift = (props) => {
    let {showNames, shift, errors, hover, onUpdateStartTime, onUpdateEndTime, onUpdateStartDate, onDelete} = props;
    let hebrewDay = momentToDay(shift.clockInTime);

    return (
        <Fragment>
            <div className={styles["name-container"]}>
                {showNames &&
                <div className={styles["name"]}>{shift.user && shift.user.firstName}</div>
                }
            </div>

            <div className={styles["shift-members"]}>
                <div className={styles["date"]}>
                    <div className={styles["hebrew-day"]}>{hebrewDay}'</div>

                    <DatePicker autoOk onChange={(date) => onUpdateStartDate(date, shift)}
                                value={shift.clockInTime}
                                format="DD/MM/YYYY"
                                style={{margin: "0 10px"}}
                                disableFuture
                    />
                </div>

                <div className={styles["times"]}>
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
            </div>
            <Warning warning={errors}/>
            <Comment description={shift.description} />
            {hover &&
            <div>
                <Tooltip title="מחיקת משמרת" placement="left">
                    <IconButton className={styles["elem"]} onClick={() => onDelete()}><Delete/></IconButton>
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
};
ReportShift.defaultProps = {};

export default ReportShift;
