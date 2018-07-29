import React, {Fragment} from 'react';
import {isWorking} from "../../helpers/utils";
import WarningIcon from "./WarningIcon";
import styles from "../../styles/LiveShift.scss";
import Home from '@material-ui/icons/Home';
import Work from '@material-ui/icons/Work';
import Delete from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TimePicker from "material-ui-pickers/TimePicker";

const LiveShift = (props) => {

    let {showNames, shift, errors, hover} = props;
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

            <div styleName={"shift-members"}>
                <div className={styles["times"]}>
                    <TimePicker
                        className={styles["time"]}
                        ampm={false}
                        autoOk
                        value={shift.clockInTime}
                        onChange={(time) => this.onUpdateStartTime(time)}
                    />

                    {!!shift.clockOutTime &&
                        <TimePicker
                            className={styles["time"]}
                            ampm={false}
                            autoOk
                            value={shift.clockOutTime}
                            onChange={(time) => this.onUpdateEndTime(time)}
                        />
                    }
                </div>
            </div>
            {errors &&
            <div className={styles["warning"]}>
                <WarningIcon text={errors}/>
            </div>
            }
            {hover &&
                <div>
                    {isWorking(shift) &&
                        <Tooltip title="סיים משמרת" placement="left">
                            <IconButton className={styles["elem"]} onClick={() => this.onShiftComplete()}><Home/></IconButton>
                        </Tooltip>
                    }
                    <Tooltip title="מחיקת משמרת" placement="left">
                        <IconButton className={styles["elem"]} onClick={() => this.onDelete()}><Delete/></IconButton>
                    </Tooltip>
                </div>
            }
        </Fragment>
    );
};


export default LiveShift;
