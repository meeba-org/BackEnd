import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import '../styles/AppBar.scss';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import * as selectors from "../selectors";
import {handleLogout, navigateHome, showGoPremiumModal} from "../actions/index";
import PropTypes from 'prop-types';
import {Logo} from "../styles/Logo";

class MeebaAppBar extends Component {
    onLogout = () => {
        let {logout, history} = this.props;
        logout(history);
    };

    onLogoClick = () => {
        let {navigateHome, history, isDesktop, onLogoClick} = this.props;
        if (isDesktop)
            navigateHome(history);
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
                            <Button color="secondary"><Link style={{color: "inherit", textDecoration: 'none'}} to="/faq">שאלות ותשובות</Link></Button>
                            {!isLoading && !hasPremium &&
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
    history: PropTypes.object.isRequired,
    companyName: PropTypes.string.isRequired,
    isDesktop: PropTypes.bool,
    isLoading: PropTypes.bool,
    hasPremium: PropTypes.bool,
};

const mapStateToProps = state => ({
    companyName: selectors.getCompanyName(state) || "מיבא",
    isDesktop: selectors.isDesktop(state),
    hasPremium: selectors.hasPremiumFeature(state),
});

const mapDispatchToProps = {
    logout: handleLogout,
    navigateHome,
    showGoPremiumModal,
    };

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(MeebaAppBar));

