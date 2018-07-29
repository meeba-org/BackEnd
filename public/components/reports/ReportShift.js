import React, {Fragment} from 'react';
import {momentToDay} from "../../helpers/utils";
import WarningIcon from "./WarningIcon";
import styles from "../../styles/ReportShift.scss";
import Delete from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DatePicker from "material-ui-pickers/DatePicker";
import TimePicker from "material-ui-pickers/TimePicker";

const ReportShift = (props) => {
    let {showNames, shift, errors, hover} = props;
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

                    <DatePicker autoOk onChange={(date) => this.onUpdateStartDate(date)} value={shift.clockInTime}
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
                        onChange={(time) => this.onUpdateStartTime(time)}
                    />

                    <TimePicker
                        className={styles["time"]}
                        ampm={false}
                        autoOk
                        value={shift.clockOutTime}
                        onChange={(time) => this.onUpdateEndTime(time)}
                    />
                </div>
            </div>
            {errors &&
                <div className={styles["warning"]}>
                    <WarningIcon text={errors}/>
                </div>
            }
            {hover &&
            <div>
                <Tooltip title="מחיקת משמרת" placement="left">
                    <IconButton className={styles["elem"]} onClick={() => this.onDelete()}><Delete/></IconButton>
                </Tooltip>
            </div>
            }
        </Fragment>
    );
};

export default ReportShift;
