import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import CSSModules from "react-css-modules";
import styles from '../styles/AppBar.scss';
import {connect} from "react-redux";
import * as selectors from "../selectors";
import {handleLogout, navigateHome} from "../actions/index";
import PropTypes from 'prop-types';

class MeebaAppBar extends Component {
    onLogout = () => {
        let {logout, router} = this.props;
        logout(router);
    };

    onLogoClock = () => {
        let {navigateHome, router} = this.props;
        navigateHome(router);
    };

    render() {
        let {companyName} = this.props;
        return (
            <div id="app-bar">
                <AppBar position="static">
                    <Toolbar id="toolbar">
                        <div className="logo" onClick={this.onLogoClock}>
                            <IconButton color="contrast" aria-label="Menu">
                                <AccessTimeIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit">{companyName}</Typography>
                        </div>
                        <div className="login">
                            <Button onClick={this.onLogout} color="contrast">יציאה</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MeebaAppBar.propTypes = {
    logout: PropTypes.func.isRequired,
    navigateHome: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    companyName: PropTypes.string.isRequired,

};

function mapStateToProps(state) {
    return {
        companyName: selectors.getCompanyName(state) || "מיבא",
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: (router) => dispatch(handleLogout(router)),
        navigateHome: (router) => dispatch(navigateHome(router)),
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(CSSModules(MeebaAppBar, styles));

