import React, {Component} from 'react';
import styles from "../../styles/Statistics.scss";
import CSSModules from "react-css-modules/dist/index";
import StatisticsCell from "./StatisticsCell";

// TODO got picture at work!
class Statistics extends Component {
    render() {
        return (
            <div id="statistics">
                <div className="content">
                    <h1>מי כבר עובד עם מיבא?</h1>
                    <div className="cells">
                        <StatisticsCell title="מנהלים" num="40" />
                        <StatisticsCell title="עובדים" num="52" />
                    </div>
                </div>
            </div>
        );
    }
}

Statistics.propTypes = {};
Statistics.defaultProps = {};

export default CSSModules(Statistics, styles);
