import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/App.scss";
import Grid from 'material-ui/Grid';
import AppBar from "./AppBar";
import SideBar from "./SideBar";
import {Paper} from "material-ui";

class App extends React.Component {

    render() {
        return (
            <div>
                <Grid container gutter={0}>
                    <Grid item xs={12}>
                        <div id="appBar-container">
                            <AppBar />
                        </div>
                    </Grid>
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

App.propTypes = {
    children: PropTypes.object.isRequired,
};

export default CSSModules(App, styles);

