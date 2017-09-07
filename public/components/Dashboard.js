import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/Dashboard.scss";
import Grid from 'material-ui/Grid';
import SideBar from "./SideBar";
import {Paper} from "material-ui";

class Dashboard extends React.Component {

    render() {
        return (
            <div id="dashboard">
                <Grid container gutter={0}>
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
            </div>
        );
    }
}

Dashboard.propTypes = {
    children: PropTypes.object,
};

export default CSSModules(Dashboard, styles);

