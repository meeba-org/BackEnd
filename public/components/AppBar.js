import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import CSSModules from "react-css-modules";
import styles from '../styles/AppBar.scss';
import {connect} from "react-redux";
import * as selectors from "../selectors";
import {handleLogout, navigateHome, showGoPremiumModal} from "../actions/index";
import PropTypes from 'prop-types';
import {Link} from "react-router";
import {Logo} from "../styles/Logo";

class MeebaAppBar extends Component {
    onLogout = () => {
        let {logout, router} = this.props;
        logout(router);
    };

    onLogoClick = () => {
        let {navigateHome, router, isDesktop, onLogoClick} = this.props;
        if (isDesktop)
            navigateHome(router);
        else
            onLogoClick();
    };

    render() {
        let {companyName, isDesktop, hasPremium, showGoPremiumModal, isLoading} = this.props;
        return (
            <div styleName="app-bar">
                <AppBar position="static" >
                    <Toolbar styleName="toolbar" color="secondary">
                        <div styleName="logo" onClick={this.onLogoClick}>
                            <IconButton color="secondary" aria-label="Menu">
                                {isDesktop ? <Logo /> : <MenuIcon/>}
                            </IconButton>
                            <Typography type="title" color="secondary">{companyName}</Typography>
                        </div>
                        <div styleName="logout">
                            <Button color="secondary"><Link style={{color: "secondary", textDecoration: 'none'}} to="/faq">שאלות ותשובות</Link></Button>
                            {isLoading === false && !hasPremium &&
                            <Button styleName="goPremiumButton" variant="contained" color="secondary" onClick={showGoPremiumModal}>הירשם כמנוי</Button>
                            }
                            <Button onClick={this.onLogout} color="secondary">יציאה</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MeebaAppBar.propTypes = {
    logout: PropTypes.func.isRequired,
    onLogoClick: PropTypes.func.isRequired,
    navigateHome: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    companyName: PropTypes.string.isRequired,
    isDesktop: PropTypes.bool,
    hasPremium: PropTypes.bool,
};

const mapStateToProps = state => ({
    companyName: selectors.getCompanyName(state) || "מיבא",
    isDesktop: selectors.isDesktop(state),
    hasPremium: selectors.hasPremiumFeature(state),
    isLoading: state.loader.isLoading
});

function mapDispatchToProps(dispatch) {
    return {
        logout: (router) => dispatch(handleLogout(router)),
        navigateHome: (router) => dispatch(navigateHome(router)),
        showGoPremiumModal: () => dispatch(showGoPremiumModal())
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(CSSModules(MeebaAppBar, styles));

