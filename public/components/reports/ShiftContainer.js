import moment from "moment";
import PropTypes from 'prop-types';
import React from "react";
import connect from "react-redux/es/connect/connect";
import {createShift, showDeleteShiftModal, updateShift, showGoPremiumModal, showLocationModal} from "../../actions";
import {ReportModes} from "../../helpers/utils";
import * as selectors from "../../selectors";
import "../../styles/Shift.scss";
import withShiftLogic from "../withShiftLogic";
import LiveShift from "./LiveShift";
import ReportShift from "./ReportShift";
import {isCompanyHasPremium} from '../../../managers/FeaturesManager';

class ShiftContainer extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            focus: false,
        };
    }

    onDelete = () => {
        let {onDelete, input} = this.props;

        onDelete(input.value);
    };

    showShiftDialog = () => {
        let {showShiftDialog, input, postUpdate} = this.props;

        // TODO 2nd parameter callBack I think is not in used
        showShiftDialog(input.value, null, postUpdate); //, (editedShift) => input.onChange(editedShift));
    };

    showLocationModal = () => {
        let {showLocationModal, input, isDesktop, company,showGoPremiumModal} = this.props;

        if (!isCompanyHasPremium(company)) {
            showGoPremiumModal();
            return;
        }

        if (!input.value.location)
            return;

        if (isDesktop)
            showLocationModal(input.value);
        else
            this.showMapInBrowser(input.value.location);
    };

    showMapInBrowser = (location) => {
        if /* if we're on iOS, open in Apple Maps */
        ((navigator.platform.indexOf("iPhone") !== -1) ||
            (navigator.platform.indexOf("iPad") !== -1) ||
            (navigator.platform.indexOf("iPod") !== -1))
            window.open(`maps://maps.google.com/maps?q=${location.latitude},${location.longitude}`);
        else /* else use Google */
            window.open(`https://maps.google.com/maps?q=${location.latitude},${location.longitude}`);
    };

    onMouseEnter = () => {
        this.setState({hover: true});
    };

    onMouseLeave = () => {
        this.setState({hover: false});
    };

    onFocus = () => {
        this.setState({focus: true});
    };

    onBlur = () => {
        this.setState({focus: false});
    };

    onUpdateStartDate = (date, shift) => {
        const {onUpdateStartDate} = this.props;
        let updatedShift = onUpdateStartDate(date, shift);

        this.onUpdate(shift, updatedShift);
    };

    onUpdateStartTime = (time, shift) => {
        const {onUpdateStartTime} = this.props;
        let updatedShift = onUpdateStartTime(time, shift);

        this.onUpdate(shift, updatedShift);
    };

    onUpdateEndTime = (time, shift) => {
        const {onUpdateEndTime} = this.props;
        let updatedShift = onUpdateEndTime(time, shift);

        this.onUpdate(shift, updatedShift);
    };

    onShiftComplete = (orgShift) => {
        let {onShiftComplete} = this.props;
        let updatedShift = onShiftComplete(orgShift);

        this.onUpdate(orgShift, updatedShift);
    };

    onUpdate = (orgShift, updatedShift) => {
        let {input, updateShift, postUpdate} = this.props;

        input.onChange(updatedShift);

        let month = moment(orgShift.clockInTime).format('MM');
        let year = moment(orgShift.clockInTime).format('YYYY');

        updateShift(updatedShift, month, year, postUpdate);
    };

    // TODO What the heck is this - duplicated onDelete
    onDelete = () => {
        let {deleteShift, input} = this.props;

        deleteShift(input.value);
    };

    getErrors = () => {
        let {input, getIntersectShift, mode} = this.props;
        let shift = input.value;
        let {clockInTime, clockOutTime} = shift;
        let isShiftTooLong = moment(clockOutTime).diff(moment(clockInTime), 'hours', true) > 12;
        if (isShiftTooLong) {
            let clockInTimeStr = moment(clockInTime).format('DD/MM/YYYY HH:mm');
            let clockOutTimeStr = moment(clockOutTime).format('DD/MM/YYYY HH:mm');
            return "משמרת מעל 12 שעות " + clockOutTimeStr + " - " + clockInTimeStr;
        }

        if (mode === ReportModes.Report) { // check relevant only for Report mode
            let intersectedShift = getIntersectShift(shift);
            if (intersectedShift) {
                return "קיימת משמרת חופפת";
            }
        }

        return undefined;
    };

    render() {
        let {showNames, input, mode, isDesktop, onDelete} = this.props;
        const {focus, hover} = this.state;
        let errors = this.getErrors();
        let classes1 = "shift " + (focus && isDesktop ? "focus" : "");

        return (
            <div styleName={classes1} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
                      onFocus={this.onFocus} onBlur={this.onBlur}>
                {mode === ReportModes.Live &&
                    <LiveShift
                        showNames={showNames}
                        shift={input.value}
                        errors={errors}
                        hover={hover}
                        showShiftDialog={this.showShiftDialog}
                        showLocationModal={this.showLocationModal}
                        isDesktop={isDesktop}
                        onDelete={this.onDelete}
                        onUpdateStartTime={this.onUpdateStartTime}
                        onUpdateEndTime={this.onUpdateEndTime}
                        onShiftComplete={this.onShiftComplete}
                    />
                }
                {mode === ReportModes.Report &&
                    <ReportShift
                        showNames={showNames}
                        shift={input.value}
                        errors={errors}
                        hover={hover}
                        onUpdateStartDate={this.onUpdateStartDate}
                        onUpdateStartTime={this.onUpdateStartTime}
                        onUpdateEndTime={this.onUpdateEndTime}
                        showShiftDialog={this.showShiftDialog}
                        showLocationModal={this.showLocationModal}
                        isDesktop={isDesktop}
                        onDelete={onDelete}
                    />
                }
            </div>
        );
    }
}

ShiftContainer.propTypes = {
    input: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    showNames: PropTypes.bool,
    mode: PropTypes.number.isRequired,
    onUpdateStartDate: PropTypes.func.isRequired,
    onUpdateStartTime: PropTypes.func.isRequired,
    onUpdateEndTime: PropTypes.func.isRequired,
    postUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isDesktop: selectors.isDesktop(state),
        company: selectors.getCompany(state)
    };
};

function mapDispatchToProps(dispatch) {
    return {
        createShift: (shift) => dispatch(createShift(shift, dispatch)),
        updateShift: (shift, month, year, postUpdate) => dispatch(updateShift(shift, dispatch, postUpdate, month, year)),
        deleteShift: (shift, month, year) => dispatch(showDeleteShiftModal(shift, dispatch, month, year)),
        showGoPremiumModal: () => dispatch(showGoPremiumModal()),
        showLocationModal: (shift) => dispatch(showLocationModal(shift)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withShiftLogic(ShiftContainer));
