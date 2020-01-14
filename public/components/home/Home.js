import React, {Component} from 'react';
import  "../../styles/Home.scss";
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

export default Home;
