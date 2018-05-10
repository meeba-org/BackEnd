import React, {Component} from 'react';
import styles from "../../styles/Statistics.scss";
import CSSModules from "react-css-modules/dist/index";
import StatisticsCell from "./StatisticsCell";
import {connect} from "react-redux";
import {fetchUsersMetaData} from "../../actions/generalActions";
import PropTypes from 'prop-types';
import * as selectors from "../../selectors";

class Statistics extends Component {

    componentDidMount() {
        this.props.fetchUsersMetaData();
    }
    render() {
        return (
            <div id="statistics">
                <div id="statistics-content">
                    <div className="content">
                        <h1>מי כבר עובד עם מיבא?</h1>
                        Hi: {this.props.meta}
                        <div className="cells">
                            <StatisticsCell title="מנהלים" num="40"/>
                            <StatisticsCell title="עובדים" num="52"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Statistics.propTypes = {
    fetchUsersMetaData: PropTypes.func.isRequired
};
Statistics.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        meta: selectors.getMeta(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersMetaData: () => dispatch(fetchUsersMetaData(true)),
    };
};
export default connect(
    null, mapDispatchToProps
)(CSSModules(Statistics, styles));
