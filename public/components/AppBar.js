import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styleSheet = createStyleSheet('MeebaAppBar', {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
});

function MeebaAppBar(props) {
    const classes = props.classes;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="contrast" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        מיבא
                    </Typography>
                    <Button color="contrast">כניסה</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

MeebaAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(MeebaAppBar);


// const styleSheet = createStyleSheet('AppBar', theme => ({
//     root: {
//         //flexGrow: 1,
//         marginTop: 30,
//     },
//     paper: {
//         padding: 16,
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));
//
//
// function AppBar(props) {
//     const classes = props.classes;
//
//     return (
//         <div className={classes.root}>
//             <AppBar title="מיבה" />
//             <Grid container gutter={16}>
//                 <Grid item xs={12}>
//                     <h1>Hello World!</h1>
//                 </Grid>
//                 <Grid item xs={3}>
//                     <Paper className={classes.paper}>xs=12</Paper>
//                 </Grid>
//                 <Grid item xs={9}>
//                     <Paper className={classes.paper}>xs=6</Paper>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }
//
// AppBar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
//
// export default withStyles(styleSheet)(AppBar);
