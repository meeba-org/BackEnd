import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/App.scss";
import Grid from 'material-ui/Grid';
import AppBar from "./AppBar";

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
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
};

export default CSSModules(App, styles);

