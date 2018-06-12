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
    fetchUsersMetaData: PropTypes.func.isRequired,
    meta: PropTypes.object
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
    mapStateToProps, mapDispatchToProps
)(CSSModules(Statistics, styles));
