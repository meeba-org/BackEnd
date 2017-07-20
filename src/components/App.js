import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AppBar from "./AppBar";
import SideBar from "./SideBar";

const styleSheet = createStyleSheet('App', theme => ({
    root: {
        flexGrow: 1,
        height: '500px'
    },
    paper: {
        padding: 0,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    listFull: {
        width: 'auto',
        flex: 'initial',
    },
}));

class App extends React.Component {

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                <Grid container gutter={0}>
                    <Grid item xs={12}>
                        <AppBar />
                    </Grid>
                    <Grid item xs={3}>
                        <SideBar />
                    </Grid>
                    <Grid item xs={9}>
                        <h3>תוכן</h3>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(App);

