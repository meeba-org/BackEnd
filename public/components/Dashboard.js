import Paper from "@material-ui/core/Paper";
import PropTypes from 'prop-types';
import React from 'react';
import CSSModules from "react-css-modules";
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

    componentDidMount() {
        this.props.loadDashboardData();
    }

    toggleDrawer = () => {
        this.setState({open: !this.state.open});
    };

    isOpen = () => {
        const {isDesktop} = this.props;
        const {open} = this.state;

        if (open === null)
            return !!isDesktop;

        return open;
    };

    render() {
        let {userRole, isDesktop, isTasksFeatureEnable, children} = this.props;
        let open = this.isOpen();

        return (
            <div styleName="dashboard">
                <div styleName="dashboard-container">
                    <div styleName="appBar-container">
                        <AppBar onLogoClick={this.toggleDrawer} isDesktop={!!isDesktop}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Dashboard, styles, {allowMultiple: true}));

