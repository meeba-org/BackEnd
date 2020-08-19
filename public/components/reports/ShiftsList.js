import moment from "moment";
import PropTypes from 'prop-types';
import React from "react";
import "./styles/ShiftsList.scss";
import Fade from "../Fade";
import NoData from "../NoData";
import ShiftContainer from "./ShiftContainer";
import {EWarningType} from "./EWarningType";

class ShiftsList extends React.PureComponent {
    onDelete(shifts, index) {
        let entityToDelete = shifts[index];
        this.props.onDelete(entityToDelete);
    }

    calcWarningType = (shift) => {
        let {shifts} = this.props;

        for (let i = 0; i < shifts.length; i++) {
            let s = shifts[i];

            if (!this.isSameShift(shift, s) && this.isSameUser(shift, s) && this.isShiftsIntersect(shift, s))
                return EWarningType.ShiftsIntersect;

            if (!this.isSameShift(shift, s) && this.isSameUser(shift, s) && this.isShiftsOnTheSameDay(shift, s))
                return EWarningType.ShiftsOnSameDays;
        }

        return null;
    }

    isSameShift(s1, s2) {
        return s1._id === s2._id;
    }

    isSameUser(s1, s2) {
        return s1.user._id === s2.user._id;
    }

    isShiftsIntersect(s1, s2) {
        if (!s1.clockInTime || !s2.clockInTime || !s1.clockOutTime || !s2.clockOutTime)
            return false;

        let maxOfClockIns = moment.max(moment(s1.clockInTime), moment(s2.clockInTime));
        let minOfClockOuts = moment.min(moment(s1.clockOutTime), moment(s2.clockOutTime));

        return minOfClockOuts.isSameOrAfter(maxOfClockIns);
    }

    isShiftsOnTheSameDay(s1, s2) {
        if (!s1.clockInTime || !s2.clockInTime)
            return false;

        return moment(s1.clockInTime).isSame(moment(s2.clockInTime), 'day');
    }

    render() {

        let {shifts, showNames, mode, shouldDisplayNoData, postUpdate} = this.props;
        return (
            <div styleName="shifts-list">
                {shifts && shifts.map((shift, index) =>
                    (<Fade key={index} isVisible>
                        <ShiftContainer
                            shift={shift}
                            onDelete={() => this.onDelete(shifts, index)}
                            showNames={showNames}
                            mode={mode}
                            calcWarningType={this.calcWarningType}
                            postUpdate={postUpdate}
                        />
                    </Fade>)
                )}
                {shouldDisplayNoData && (!shifts || (shifts.length === 0)) &&
                <NoData text="לא נמצאו משמרות"/>
                }
            </div>
        );
    }
}

ShiftsList.propTypes = {
    shifts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    showNames: PropTypes.bool,
    shouldDisplayNoData: PropTypes.bool,
    mode: PropTypes.number.isRequired,
};

export default ShiftsList;
