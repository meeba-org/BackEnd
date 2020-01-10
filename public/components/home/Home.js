import React from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/Home.scss";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Movie from "./Movie";
import Statistics from "./Statistics";

const Home = () => {
    return (
        <div styleName="home">
            <div styleName="home-bg">
                <Header/>
                <Movie/>
                <Features/>
                <Statistics/>
                <Footer/>
            </div>
        </div>
    );
};

export default CSSModules(Home, styles);
