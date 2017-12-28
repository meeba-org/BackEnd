import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/Dashboard.scss";
import Grid from 'material-ui/Grid';
import SideBar from "./SideBar";
import {Paper} from "material-ui";
import AppBar from "./AppBar";
import {connect} from "react-redux";
import {loadUserFromToken} from "../actions/index";
import * as selectors from "../selectors";

class Dashboard extends React.Component {

    componentWillMount() {
        this.props.loadUserFromToken();
    }

    render() {
        let {router, userRole} = this.props;

        return (
            <div id="dashboard">
                <div id="container">
                    <Grid container>
                        <Grid item xs={12}>
                            <div id="appBar-container">
                                <AppBar router={router}/>
                            </div>
                        </Grid>
                        <Grid container id="grid-container">
                            <Grid item xs={3}>
                                <Paper id="sideBar-container">
                                    <SideBar userRole={userRole}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={9}>
                                <Paper id="main-container">
                                    {this.props.children}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
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

