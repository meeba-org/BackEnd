import React, {Component} from 'react';
import styles from "../../styles/Home.scss";
import CSSModules from "react-css-modules";
import LoginRegisterContainer from "../login/LoginRegisterContainer";
import PropTypes from 'prop-types';
import Header from "./Header";
import Footer from "./Footer";
import Features from "./Features";
import Statistics from "./Statistics";

class Home extends Component {
    state = {
        visible: false
    };

    setLoginDialogVisibility = (visible) => {
        this.setState({visible});
    };

    render() {
        return (
            <div styleName="home">
                <div styleName="home-bg">
                    <Header setLoginDialogVisibility={this.setLoginDialogVisibility}/>
                    <Features />
                    <Statistics />
                    <Footer />
                </div>
                <LoginRegisterContainer
                    visible={this.state.visible}
                    router={this.props.router}
                    onCancel={() => this.setLoginDialogVisibility(false)}
                />
            </div>
        );
    }
}

Home.propTypes = {
    router: PropTypes.object,
};
Home.defaultProps = {};

export default CSSModules(Home, styles);
