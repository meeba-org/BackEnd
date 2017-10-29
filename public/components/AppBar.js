import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import CSSModules from "react-css-modules";
import styles from '../styles/AppBar.scss';
import {connect} from "react-redux";
import * as selectors from "../selectors";
import {handleLogout} from "../actions/index";

class MeebaAppBar extends Component {
    render() {
        let {logout, router, companyName} = this.props;
        return (
            <div id="app-bar">
                <AppBar position="static">
                    <Toolbar id="toolbar">
                        <IconButton color="contrast" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit">{companyName}</Typography>
                        <div className="login">
                            <Button onClick={() => logout(router)} color="contrast">יציאה</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MeebaAppBar.propTypes = {};

function mapStateToProps(state) {
    return {
        companyName: selectors.getCompanyName(state) || "מיבא",
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: (router) => dispatch(handleLogout(router)),
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(CSSModules(MeebaAppBar, styles));

