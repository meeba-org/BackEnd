import React from 'react';
import "../../styles/Home.scss";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Movie from "./Movie";
import Statistics from "./Statistics";

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
