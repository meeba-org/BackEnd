import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles/HoursSummary.scss';
import {prepareHourToDisplay} from "../../helpers/utils";

class HoursSummary extends Component {
    render() {
        let {regularHours, extra125Hours, extra150Hours, extra175Hours, extra200Hours} = this.props.data;

        let regularHoursDisplay = prepareHourToDisplay(regularHours);
        let extra125HoursDisplay = prepareHourToDisplay(extra125Hours);
        let extra150HoursDisplay = prepareHourToDisplay(extra150Hours);
        let extra175HoursDisplay = prepareHourToDisplay(extra175Hours);
        let extra200HoursDisplay = prepareHourToDisplay(extra200Hours);

        return (
            <div styleName="hours-summary-container">
                <div styleName="hours-item">
                    <div styleName="hour-label">100%:</div>
                    <div styleName="regular-hours">{regularHoursDisplay}</div>
                </div>
                {extra125Hours > 0 &&
                    <div styleName="hours-item">
                        <div styleName="hour-label">125%:</div>
                        <div styleName="extra-125">{extra125HoursDisplay}</div>
                    </div>
                }
                {extra150Hours > 0 &&
                <div styleName="hours-item">
                    <div styleName="hour-label">150%:</div>
                    <div styleName="extra-150">{extra150HoursDisplay}</div>
                </div>
                }
                {extra175Hours > 0 &&
                <div styleName="hours-item">
                    <div styleName="hour-label">175%:</div>
                    <div styleName="extra-175">{extra175HoursDisplay}</div>
                </div>
                }
                {extra200Hours > 0 &&
                <div styleName="hours-item">
                    <div styleName="hour-label">200%:</div>
                    <div styleName="extra-200">{extra200HoursDisplay}</div>
                </div>
                }
            </div>
        );
    }
}

HoursSummary.propTypes = {
    data: PropTypes.object.isRequired
};

HoursSummary.defaultProps = {};

export default HoursSummary;
