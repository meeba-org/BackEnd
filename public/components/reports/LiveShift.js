import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {isWorking} from "../../helpers/utils";
import styles from "../../styles/LiveShift.scss";
import Home from '@material-ui/icons/Home';
import Work from '@material-ui/icons/Work';
import Delete from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TimePicker from "material-ui-pickers/TimePicker";
import Note from "./Note";
import Warning from "./Warning";

const LiveShift = (props) => {
    let {showNames, shift, errors, hover, onUpdateStartTime, onUpdateEndTime, onDelete, onShiftComplete} = props;
    let icon = isWorking(shift) ?
        <Tooltip title="בעבודה" placement="right"><Work/></Tooltip> :
        <Tooltip title="בבית" placement="right"><Home/></Tooltip>;

    return (
        <Fragment>
            <div className={styles["name-container"]}>
                <IconButton className={styles["icon"]}>{icon}</IconButton>
                {showNames &&
                <div className={styles["name"]}>{shift.user && shift.user.firstName}</div>
                }
            </div>

            <div className={styles["shift-members"]}>
                <div className={styles["times"]}>
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
            </div>
            <Warning warning={errors}/>
            <Note text={shift.note} />
            {hover &&
            <div>
                {isWorking(shift) &&
                <Tooltip title="סיים משמרת" placement="left">
                    <IconButton className={styles["elem"]} onClick={() => onShiftComplete()}><Home/></IconButton>
                </Tooltip>
                }
                <Tooltip title="מחיקת משמרת" placement="left">
                    <IconButton className={styles["elem"]} onClick={() => onDelete()}><Delete/></IconButton>
                </Tooltip>
            </div>
            }
        </Fragment>
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
};
LiveShift.defaultProps = {};

export default LiveShift;
