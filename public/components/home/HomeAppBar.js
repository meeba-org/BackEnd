import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import facebookImage from "../../styles/images/facebook.png";
import React, {Component, Fragment} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router";

const styles = {
    colorPrimary: {
        backgroundColor: "transparent",
        boxShadow: "none",
        color: "white"
    },
    rightButtonsGroup: {
        flexGrow: 1,
    },
    link: {
        color: "inherit",
        textDecoration: "none"
    },
    button: {
        color: "inherit",
        textDecoration: "none"
    }
};

class HomeAppBar extends Component {
    render() {
        let {setLoginDialogVisibility, classes} = this.props;

        return (
            <AppBar position="fixed" classes={{ colorPrimary: classes.colorPrimary}}>
                <Toolbar>
                    <IconButton aria-label="Menu" color="inherit">
                        <AccessTimeIcon/>
                    </IconButton>
                    <Typography type="title" color="inherit">
                        מיבא
                    </Typography>
                    <div className={classes.rightButtonsGroup}>
                        <Button className={classes.button}><Link to="/home#header1" className={classes.link}>בית</Link></Button>
                        <Button className={classes.button}><Link to="/home#features1" className={classes.link}>איך זה עובד?</Link></Button>
                        <Button href="https://www.facebook.com/meebaOnFace/" style={{color: "inherit"}} target="_blank">
                            <img src={facebookImage}/>
                        </Button>
                    </div>
                    <div>
                        <Button color="inherit"><Link to="/faq" className={classes.link}>שאלות ותשובות</Link></Button>
                        <Button color="inherit" onClick={() => setLoginDialogVisibility(true)}>כניסה</Button>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(HomeAppBar);
