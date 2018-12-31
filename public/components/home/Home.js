import React, {Component} from 'react';
import styles from "../../styles/Home.scss";
import CSSModules from "react-css-modules";
import PropTypes from 'prop-types';
import Header from "./Header";
import Footer from "./Footer";
import Features from "./Features";
import Statistics from "./Statistics";
import Movie from "./Movie";

class Home extends Component {
    state = {
        visible: false
    };

    render() {
        return (
            <div styleName="home">
                <div styleName="home-bg">
                    <Header />
                    <Movie />
                    <Features />
                    <Statistics />
                    <Footer />
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    router: PropTypes.object,
};
Home.defaultProps = {};

export default CSSModules(Home, styles);
