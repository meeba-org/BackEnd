import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/HoursSummary.scss';
import CSSModules from "react-css-modules";

class HoursSummary extends Component {
    render() {
        let {regularHours, extra125Hours, extra150Hours, extra175Hours, extra200Hours} = this.props.data;
        const MAX_HOURS_PER_MONTH = 200;

        let total = (parseFloat(regularHours) + parseFloat(extra125Hours) + parseFloat(extra150Hours) + parseFloat(extra175Hours) + parseFloat(extra200Hours));
        const factor = total / MAX_HOURS_PER_MONTH;
        let extra125HoursPer = Math.floor(extra125Hours / total * 100) * factor ;
        let extra150HoursPer = Math.floor(extra150Hours / total * 100) * factor ;
        let extra175HoursPer = Math.floor(extra175Hours / total * 100) * factor ;
        let extra200HoursPer = Math.floor(extra200Hours / total * 100) * factor ;

        return (
            <div styleName="hours-summary-container">
                <div styleName="hours-item">
                    <div styleName="hour-label">100%:</div>
                    <div styleName="regular-hours">{regularHours}</div>
                </div>
                {extra125HoursPer > 0 &&
                    <div styleName="hours-item">
                        <div styleName="hour-label">125%:</div>
                        <div styleName="extra-125">{extra125Hours}</div>
                    </div>
                }
                {extra150HoursPer > 0 &&
                <div styleName="hours-item">
                    <div styleName="hour-label">150%:</div>
                    <div styleName="extra-150">{extra150Hours}</div>
                </div>
                }
                {extra175HoursPer > 0 &&
                <div styleName="hours-item">
                    <div styleName="hour-label">175%:</div>
                    <div styleName="extra-175">{extra175Hours}</div>
                </div>
                }
                {extra200HoursPer > 0 &&
                <div styleName="hours-item">
                    <div styleName="hour-label">200%:</div>
                    <div styleName="extra-200">{extra200Hours}</div>
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

export default CSSModules(HoursSummary, styles);
