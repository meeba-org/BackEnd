import React, {Component} from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/Movie.scss";
import YouTube from "react-youtube";

class Movie extends Component {
    state = {};

    render() {
        return (
            <div styleName="movie-container">
                <div styleName="title">קצת על מיבא...</div>
                <div styleName="movie-wrapper">
                    <YouTube videoId="oCKVp53Nefo"/>
                </div>
            </div>
        );
    }
}

Movie.propTypes = {};
Movie.defaultProps = {};

export default CSSModules(Movie, styles);
