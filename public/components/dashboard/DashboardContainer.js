import PropTypes from 'prop-types';
import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {loadDashboardData} from "../../actions/generalActions";
import * as selectors from "../../selectors";
import Dashboard from "./Dashboard";

class DashboardContainer extends React.PureComponent {

    state = {
        isLoading: true,
    };

    componentDidMount() {
        const {loadDashboardData, user} = this.props;

        loadDashboardData(() => this.setState({isLoading: false}), user);
    }

    render() {
        let {userRole, isDesktop, isTasksFeatureEnable, match: {path}, hasPremium } = this.props;
        const {isLoading} = this.state;

        return (
            <Dashboard
                userRole={userRole}
                isDesktop={isDesktop}
                path={path}
                hasPremium={hasPremium}
                isLoading={isLoading}
            />
        );
    }
}

DashboardContainer.propTypes = {
    loadDashboardData: PropTypes.func.isRequired,
    userRole: PropTypes.string,
    isDesktop: PropTypes.bool
};

const mapStateToProps = (state) => ({
    userRole: selectors.getUserRole(state),
    isDesktop: selectors.isDesktop(state),
    hasPremium: selectors.hasPremiumFeature(state),
    user: selectors.getUser(state)
});

const mapDispatchToProps = {
    loadDashboardData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardContainer));

