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

class Dashboard extends React.Component {

    componentWillMount() {
        this.props.loadUserFromToken();
    }

    render() {
        let {router} = this.props;

        return (
            <div id="dashboard">
                <Grid container>
                    <Grid item xs={12}>
                        <div id="appBar-container">
                            <AppBar router={router}/>
                        </div>
                    </Grid>
                    <Grid container id="container">
                        <Grid item xs={3}>
                            <Paper id="sideBar-container">
                                <SideBar />
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
        );
    }
}

Dashboard.propTypes = {
    loadUserFromToken: PropTypes.func.isRequired,
    children: PropTypes.object,
    router: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserFromToken: () => {dispatch(loadUserFromToken());},
    };
};

export default connect(null, mapDispatchToProps)(CSSModules(Dashboard, styles));

