import React, {Component} from 'react';
import styles from "../../styles/Statistics.scss";
import CSSModules from "react-css-modules/dist/index";

// TODO got picture at work!
class Statistics extends Component {
    render() {
        return (
            <div id="statistics">
                <div>הסטטסיטיקה שלנו</div>
                <div>
                    32 מנהלים
                </div>
                <div>
                    56 עובדים
                </div>
            </div>
        );
    }
}

Statistics.propTypes = {};
Statistics.defaultProps = {};

export default CSSModules(Statistics, styles);
