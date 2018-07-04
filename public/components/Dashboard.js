import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/Dashboard.scss";
import SideBar from "./SideBar";
import Paper from "@material-ui/core/Paper";
import AppBar from "./AppBar";
import {connect} from "react-redux";
import {loadUserFromToken} from "../actions/index";
import * as selectors from "../selectors";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

class Dashboard extends React.PureComponent {

    state = {
        open: null,
    };

    componentWillMount() {
        this.props.loadUserFromToken();
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
        let {router, userRole, isDesktop} = this.props;
        let open = this.isOpen();

        return (
            <div styleName="dashboard">
                <div styleName="dashboard-container">
                    <div styleName="appBar-container">
                        <AppBar router={router} onLogoClick={this.toggleDrawer} isDesktop={!!isDesktop}/>
                    </div>
                    <div styleName="grid-container">
                        <Paper styleName={"sideBar-container" + (isDesktop ? " isDesktop" : "")}>
                            <SideBar userRole={userRole} isDesktop={!!isDesktop} open={open} toggleSideBar={this.toggleDrawer}/>
                        </Paper>
                        <Paper styleName="main-container">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                            {this.props.children}
                            </MuiPickersUtilsProvider>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    loadUserFromToken: PropTypes.func.isRequired,
    children: PropTypes.object,
    router: PropTypes.object.isRequired,
    userRole: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        userRole: selectors.getUserRole(state),
        isDesktop: selectors.isDesktop(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserFromToken: () => {
            dispatch(loadUserFromToken());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Dashboard, styles, {allowMultiple: true}));

