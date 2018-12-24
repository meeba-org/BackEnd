import React from "react";
import Field from "redux-form/es/Field";
import PropTypes from 'prop-types';
import ShiftContainer from "./ShiftContainer";
import CSSModules from "react-css-modules";
import NoData from "../NoData";
import styles from "../../styles/ShiftsList.scss";
import Fade from "../Fade";
import moment from "moment";

class ShiftsList extends React.PureComponent {
    onCreate(fields) {
        let newEntity = {};
        fields.push(newEntity);
        this.props.onCreate(newEntity);
    }

    onUpdate(entity) {
        this.props.onUpdate(entity);
    }

    onDelete(fields, index) {
        let entityToDelete = fields.get(index);
        this.props.onDelete(entityToDelete);
    }

    getIntersectShift = (shift) => {
        let {fields} = this.props;

        for (let i = 0; i < fields.length; i++) {
            let s = fields.get(i);

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

        let {fields, showNames, mode, shouldDisplayNoData, showShiftDialog, showMapModal} = this.props;
        return (
            <div styleName="shifts-list">
                {fields && fields.map((shiftName, index) =>
                    (<Fade key={index}>
                            <Field
                                component={ShiftContainer}
                                name={shiftName} key={index}
                                onDelete={() => this.onDelete(fields, index)}
                                showShiftDialog={showShiftDialog}
                                showMapModal={showMapModal}
                                onUpdate={(shift) => this.onUpdate(shift)}
                                showNames={showNames}
                                mode={mode}
                                getIntersectShift={this.getIntersectShift}
                            />
                    </Fade>)
                )}
                {shouldDisplayNoData && (!fields || (fields.length === 0)) &&
                <NoData text="לא נמצאו משמרות"/>
                }
            </div>
        );
    }
}

ShiftsList.propTypes = {
    fields: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    showMapModal: PropTypes.func.isRequired,
    showNames: PropTypes.bool,
    shouldDisplayNoData: PropTypes.bool,
    mode: PropTypes.number.isRequired,
};

export default CSSModules(ShiftsList, styles);
