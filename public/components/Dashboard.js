import Paper from "@material-ui/core/Paper";
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from "react-redux";
import {loadDashboardData} from "../actions/generalActions";
import * as selectors from "../selectors";
import styles from "../styles/Dashboard.scss";
import AppBar from "./AppBar";
import SideBarContainer from "./SideBarContainer";

class Dashboard extends React.PureComponent {

    state = {
        open: null,
    };

    componentWillMount() {
        this.props.loadDashboardData();
    }

    toggleDrawer = () => {
        this.setState({open: !this.state.open});
    };

    isOpen = () => {
        if (this.state.open === null)
            return !!this.props.isDesktop;

        return this.state.open;
    };

    render() {
        let {router, userRole, isDesktop, isTasksFeatureEnable, children} = this.props;
        let open = this.isOpen();

        return (
            <div styleName="dashboard">
                <div styleName="dashboard-container">
                    <div styleName="appBar-container">
                        <AppBar router={router} onLogoClick={this.toggleDrawer} isDesktop={!!isDesktop}/>
                    </div>
                    <div styleName="grid-container">
                        <Paper styleName={"sideBar-container" + (isDesktop ? " isDesktop" : "")}>
                            <SideBarContainer
                                userRole={userRole}
                                isDesktop={!!isDesktop}
                                open={open}
                                toggleSideBar={this.toggleDrawer}
                                isTasksFeatureEnable={isTasksFeatureEnable}
                            />
                        </Paper>
                        <Paper styleName="main-container">
                            {children}
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    loadDashboardData: PropTypes.func.isRequired,
    children: PropTypes.object,
    router: PropTypes.object.isRequired,
    userRole: PropTypes.string,
    isDesktop: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        userRole: selectors.getUserRole(state),
        isDesktop: selectors.isDesktop(state),
        isTasksFeatureEnable: selectors.isTasksFeatureEnable(state),
    };
};

const mapDispatchToProps = {
    loadDashboardData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard, styles, {allowMultiple: true});

