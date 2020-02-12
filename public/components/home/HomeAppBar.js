import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {showLoginRegisterDialog} from "../../actions";
import * as selectors from "../../selectors";
import "../../styles/HomeAppBar.scss";
import facebookImage from "../../styles/images/facebook.png";
import {Logo} from "../../styles/Logo";

class HomeAppBar extends Component {

    state = {
        isTop: true
    };

    componentDidMount() {
        document.addEventListener('scroll', this.topScrollListener);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.topScrollListener);
    }

    topScrollListener = () => {
        const isTop = window.scrollY < 60;
        if (isTop !== this.state.isTop) {
            this.setState({isTop});
        }
    };

    render() {
        let {location} = this.props;
        const {isTop} = this.state;
        const isTopClass = isTop ? 'isTop' : '';

        return (
            <AppBar position="fixed" styleName={`home-app-bar ${isTopClass}`}>
                <Toolbar styleName={`toolbar ${isTopClass}`}>
                    <div styleName="right-buttons-group">
                        <Link to="/dashboard" styleName="link">
                            <IconButton aria-label="Menu" color="inherit">
                                <Logo />
                                <Typography type="title" color="inherit" style={{paddingRight: "10px"}}>
                                    מיבא
                                </Typography>
                            </IconButton>
                        </Link>
                        <Button color="inherit" href={"https://m.me/meebaOnFace"}>צ'אט</Button>
                        <Button href="https://www.facebook.com/meebaOnFace/" styleName="facebook-logo" target="_blank">
                            <img src={facebookImage}/>
                        </Button>
                    </div>
                    <div>
                        {location.pathname !== '/faq' &&
                        <Button color="inherit"><Link to="/faq" styleName="faq">שאלות ותשובות</Link></Button>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => ({
    isDesktop: selectors.isDesktop(state)
});

const mapDispatchToProps = {
    showLoginRegisterDialog,
};

// withStyles() is needed here for the component to not crash in production - not sure why... :(
export default connect(mapStateToProps, mapDispatchToProps)(withStyles()(withRouter(HomeAppBar)));
