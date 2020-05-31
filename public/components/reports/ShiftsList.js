import moment from "moment";
import PropTypes from 'prop-types';
import React from "react";
import Field from "redux-form/es/Field";
import "../../styles/ShiftsList.scss";
import Fade from "../Fade";
import NoData from "../NoData";
import ShiftContainer from "./ShiftContainer";

class ShiftsList extends React.PureComponent {
    onDelete(shifts, index) {
        let entityToDelete = shifts[index];
        this.props.onDelete(entityToDelete);
    }

    getIntersectShift = (shift) => {
        let {shifts} = this.props;

        for (let i = 0; i < shifts.length; i++) {
            let s = shifts[i];

            if (!this.isSameShift(shift, s) && this.isSameUser(shift, s) && this.isShiftsIntersect(shift, s))
                return s;
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

    render() {

        let {shifts, showNames, mode, shouldDisplayNoData, showShiftDialog, postUpdate} = this.props;
        return (
            <div styleName="shifts-list">
                {shifts && shifts.map((shift, index) =>
                    (<Fade key={index} isVisible>
                        <ShiftContainer
                            shift={shift}
                            onDelete={() => this.onDelete(shifts, index)}
                            showShiftDialog={showShiftDialog}
                            showNames={showNames}
                            mode={mode}
                            getIntersectShift={this.getIntersectShift}
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
    showShiftDialog: PropTypes.func.isRequired,
    showNames: PropTypes.bool,
    shouldDisplayNoData: PropTypes.bool,
    mode: PropTypes.number.isRequired,
    postUpdate: PropTypes.func.isRequired,
};

export default ShiftsList;
