import moment from "moment";
import PropTypes from 'prop-types';
import React from "react";
import CSSModules from "react-css-modules";
import connect from "react-redux/es/connect/connect";
import {ReportModes} from "../../helpers/utils";
import * as selectors from "../../selectors";
import styles from "../../styles/Shift.scss";
import LiveShift from "./LiveShift";
import ReportShift from "./ReportShift";

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
        let {showShiftDialog, input} = this.props;

        showShiftDialog(input.value, (editedShift) => input.onChange(editedShift));
    };

    showLocationModal = () => {
        let {showLocationModal, input, isDesktop} = this.props;

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
        let classes1 = "shift " + (focus ? "focus" : "");

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
                        onDelete={onDelete}
                    />
                }
                {mode === ReportModes.Report &&
                    <ReportShift
                        showNames={showNames}
                        shift={input.value}
                        errors={errors}
                        hover={hover}
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
    onDelete: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    showNames: PropTypes.bool,
    mode: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isDesktop: selectors.isDesktop(state)
    };
};

export default connect(mapStateToProps)(CSSModules(ShiftContainer, styles, {allowMultiple: true}));
