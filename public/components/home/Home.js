import React, {Component} from 'react';
import {connect} from "react-redux";
import * as selectors from "../../selectors";
import "../../styles/Home.scss";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Statistics from "./Statistics";
import Videos from "./Videos";

class Home extends Component {

    render() {
        const {isDesktop} = this.props;

        return (
            <div styleName="home">
                <div styleName="home-bg">
                    <Header />
                    {isDesktop && <Videos/>}
                    <Features />
                    <Statistics />
                    <Footer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isDesktop: selectors.isDesktop(state),
});

export default connect(mapStateToProps)(Home);
