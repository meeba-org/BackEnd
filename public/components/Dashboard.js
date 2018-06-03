import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/Dashboard.scss";
import SideBar from "./SideBar";
import {Paper} from "@material-ui/core";
import AppBar from "./AppBar";
import {connect} from "react-redux";
import {loadUserFromToken} from "../actions/index";
import * as selectors from "../selectors";
import {MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

class Dashboard extends React.PureComponent {

    componentWillMount() {
        this.props.loadUserFromToken();
    }

    render() {
        let {router, userRole} = this.props;

        return (
            <div id="dashboard">
                <div id="dashboard-container">
                    <div id="appBar-container">
                        <AppBar router={router}/>
                    </div>
                    <div id="grid-container">
                        <Paper id="sideBar-container">
                            <SideBar userRole={userRole}/>
                        </Paper>
                        <Paper id="main-container">
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserFromToken: () => {
            dispatch(loadUserFromToken());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Dashboard, styles));

