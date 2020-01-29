import React from 'react';
import LazyLoad from 'react-lazyload';
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
                <LazyLoad offset={-100}>
                    <img src="https://www.istoreil.co.il/media/catalog/product/cache/1/image/1000x/0dc2d03fe217f8c83829496872af24a0/i/p/iphone_11_pro_iphone_11_pro_max_mg.jpg" />
                </LazyLoad>
                {/*<Movie />*/}
                {/*<LazyLoad>*/}
                {/*    <Features />*/}
                {/*    <Statistics />*/}
                {/*    <Footer />*/}
                {/*</LazyLoad>*/}
            </div>
        </div>
    );
};

export default Home;
