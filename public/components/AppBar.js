import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
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
            <div styleName="app-bar">
                <AppBar position="static">
                    <Toolbar styleName="toolbar">
                        <div styleName="logo" onClick={this.onLogoClock}>
                            <IconButton color="inherit" aria-label="Menu">
                                <AccessTimeIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit">{companyName}</Typography>
                        </div>
                        <div styleName="login">
                            <Button onClick={this.onLogout} color="inherit">יציאה</Button>
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

