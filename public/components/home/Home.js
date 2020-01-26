import React, {Component} from 'react';
import  "../../styles/Home.scss";
import Header from "./Header";
import Footer from "./Footer";
import Features from "./Features";
import Statistics from "./Statistics";
import Movie from "./Movie";

const Home = () => {
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
};

export default Home;
