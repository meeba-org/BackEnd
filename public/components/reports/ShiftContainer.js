import moment from "moment";
import PropTypes from 'prop-types';
import React, {useState} from "react";
import connect from "react-redux/es/connect/connect";
import {createShift, showDeleteShiftModal, updateShift, showGoPremiumModal, showLocationModal} from "../../actions";
import {GACategory, sendGaEvent} from "../../helpers/GAService";
import {ReportModes} from "../../helpers/utils";
import * as selectors from "../../selectors";
import "../../styles/Shift.scss";
import withShiftLogic from "../withShiftLogic";
import LiveShift from "./LiveShift";
import ReportShift from "./ReportShift";
import {isCompanyHasPremium} from '../../../managers/FeaturesManager';

const ShiftContainer = ({showShiftDialog, shift, postUpdate, showNames, mode, isDesktop, onDelete, isInnovativeAuthorityEnable, showLocationModal, company, 
                            showGoPremiumModal, onUpdateStartDate, onUpdateEndTime, onUpdateStartTime, onShiftComplete, updateShift, getIntersectShift}) => {
    const [hover, setHover] = useState(false);
    const [focus, setFocus] = useState(false);

    const showShiftDialog0 = () => {
        // TODO 2nd parameter callBack I think is not in used
        showShiftDialog(shift, null, postUpdate); //, (editedShift) => shift.onChange(editedShift));
    };

    const showLocationModal0 = () => {
        if (!isCompanyHasPremium(company)) {
            showGoPremiumModal();
            return;
        }

        if (!shift.location)
            return;

        if (isDesktop)
            showLocationModal(shift);
        else
            showMapInBrowser(shift.location);
    };

    const showMapInBrowser = (location) => {
        if /* if we're on iOS, open in Apple Maps */
        ((navigator.platform.indexOf("iPhone") !== -1) ||
            (navigator.platform.indexOf("iPad") !== -1) ||
            (navigator.platform.indexOf("iPod") !== -1))
            window.open(`maps://maps.google.com/maps?q=${location.latitude},${location.longitude}`);
        else /* else use Google */
            window.open(`https://maps.google.com/maps?q=${location.latitude},${location.longitude}`);
    };

    const onMouseEnter = () => setHover(true);

    const onMouseLeave = () => setHover(false);

    const onFocus = () => setFocus(true);

    const onBlur = () => setFocus(false);

    const onUpdateStartDate0 = (date, shift) => {
        let updatedShift = onUpdateStartDate(date, shift);
        updatedShift.isClockInTimeRetro = true;

        onUpdate(shift, updatedShift);
    };

    const onUpdateStartTime0 = (time, shift) => {
        let updatedShift = onUpdateStartTime(time, shift);
        updatedShift.isClockInTimeRetro = true;

        onUpdate(shift, updatedShift);
    };

    const onUpdateEndTime0 = (time, shift) => {
        let updatedShift = onUpdateEndTime(time, shift);
        updatedShift.isClockOutTimeRetro = true;

        onUpdate(shift, updatedShift);
    };

    const onShiftComplete0 = (orgShift) => {
        let updatedShift = onShiftComplete(orgShift);
        sendGaEvent({
            category: GACategory.CLOCK_OUT,
            action: "web"
        });

        onUpdate(orgShift, updatedShift);
    };

    const onUpdate = (orgShift, updatedShift) => {
        let month = moment(orgShift.clockInTime).format('MM');
        let year = moment(orgShift.clockInTime).format('YYYY');

        updateShift(updatedShift, postUpdate, month, year);
    };

    const getErrors = () => {
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

    let errors = getErrors();
    let classes1 = "shift " + (focus && isDesktop ? "focus" : "");

    return (
        <div styleName={classes1} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
             onFocus={onFocus} onBlur={onBlur}>
            {mode === ReportModes.Live &&
            <LiveShift
                showNames={showNames}
                shift={shift}
                errors={errors}
                hover={hover}
                showShiftDialog={showShiftDialog0}
                showLocationModal={showLocationModal0}
                isDesktop={isDesktop}
                onDelete={onDelete}
                onUpdateStartTime={onUpdateStartTime0}
                onUpdateEndTime={onUpdateEndTime0}
                onShiftComplete={onShiftComplete0}
            />
            }
            {mode === ReportModes.Report &&
            <ReportShift
                showNames={showNames}
                shift={shift}
                errors={errors}
                hover={hover}
                onUpdateStartDate={onUpdateStartDate0}
                onUpdateStartTime={onUpdateStartTime}
                onUpdateEndTime={onUpdateEndTime0}
                showShiftDialog={showShiftDialog0}
                showLocationModal={showLocationModal0}
                isDesktop={isDesktop}
                onDelete={onDelete}
                isInnovativeAuthorityEnable={isInnovativeAuthorityEnable}
            />
            }
        </div>
    );
};

ShiftContainer.propTypes = {
    shift: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    showNames: PropTypes.bool,
    mode: PropTypes.number.isRequired,
    onUpdateStartDate: PropTypes.func.isRequired,
    onUpdateStartTime: PropTypes.func.isRequired,
    onUpdateEndTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isDesktop: selectors.isDesktop(state),
    company: selectors.getCompany(state),
    isInnovativeAuthorityEnable: selectors.isInnovativeAuthorityEnable(state)
});

const mapDispatchToProps = {
    createShift,
    updateShift,
    deleteShift: showDeleteShiftModal,
    showGoPremiumModal,
    showLocationModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(withShiftLogic(ShiftContainer));
