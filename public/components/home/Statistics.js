import React, {Component} from 'react';
import styles from "../../styles/Statistics.scss";
import StatisticsCell from "./StatisticsCell";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import * as selectors from "../../selectors";

class Statistics extends Component {

    render() {
        let meta = this.props.meta || {};

        return (
            <div styleName="statistics">
                <div styleName="statistics-content">
                    <div styleName="content">
                        <h1>מי כבר עובד עם מיבא?</h1>
                        <div styleName="cells">
                            <StatisticsCell title="מנהלים" num={meta.companiesCount}/>
                            <StatisticsCell title="עובדים" num={meta.usersCount}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Statistics.propTypes = {
    meta: PropTypes.object
};
Statistics.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        meta: selectors.getMeta(state),
    };
};

export default connect(
    mapStateToProps, null
)(Statistics);
