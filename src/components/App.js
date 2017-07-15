import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import StarIcon from 'material-ui-icons/Star';
import AppBar from "./AppBar";


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

        const menuItems = (
            <div>
                <List className={classes.listFull} disablePadding>
                    <div>
                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="מצב משמרת"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="דוח חודשי"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="דוח יומי"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="ייצוא לאקסל"/>
                        </ListItem>
                    </div>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <Grid container gutter={0}>
                    <Grid item xs={12}>
                        <AppBar />
                    </Grid>
                    <Grid item xs={3}>
                        {menuItems}
                    </Grid>
                    <Grid item xs={9}>
                        <Paper>
                            <h3>תוכן</h3>
                        </Paper>
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
