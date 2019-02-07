import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import facebookImage from "../../styles/images/facebook.png";
import React, {Component, Fragment} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Link, withRouter} from "react-router";
import {showLoginRegisterDialog} from "../../actions";
import {connect} from 'react-redux';
import * as selectors from "../../selectors";

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
    faq: {
        color: "white",
        textDecoration: "none",
        minWidth: "30px"
    },
    // button: {
    //     color: "inherit",
    //     textDecoration: "none"
    // },
    facebookLogo: {
        color: "inherit",
        minWidth: "30px",
        paddingRight: "0px",
        paddingLeft: "0px"
    }
};

class HomeAppBar extends Component {
    render() {
        let {showLoginRegisterDialog, classes, location} = this.props;

        return (
            <AppBar position="fixed" classes={{ colorPrimary: classes.colorPrimary}}>
                <Toolbar>
                    <Link to="/home" className={classes.link}>
                        <IconButton aria-label="Menu" color="inherit">
                            <AccessTimeIcon/>
                            <Typography type="title" color="inherit" style={{paddingRight: "5px"}}>
                                מיבא
                            </Typography>
                        </IconButton>
                    </Link>
                    <div className={classes.rightButtonsGroup}>
                        {/*<Button className={classes.button}><Link to="/home#header1" className={classes.link}>בית</Link></Button>*/}
                        {/*<Button className={classes.button}><Link to="/home#features1" className={classes.link}>איך זה עובד?</Link></Button>*/}
                        <Button color="inherit" href={"https://m.me/meebaOnFace"}>צ'אט</Button>
                        <Button href="https://www.facebook.com/meebaOnFace/" className={classes.facebookLogo} target="_blank">
                            <img src={facebookImage}/>
                        </Button>
                    </div>
                    <div>
                        {location.pathname !== '/faq' &&
                        <Button color="inherit"><Link to="/faq" className={classes.faq}>שאלות ותשובות</Link></Button>
                        }
                        {location.pathname === '/faq' &&
                        <Button color="inherit" onClick={showLoginRegisterDialog}>כניסה</Button>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDesktop: selectors.isDesktop(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showLoginRegisterDialog: () => {dispatch(showLoginRegisterDialog());},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(HomeAppBar)));
