import React, {Component} from 'react';
import "../../styles/Movie.scss";
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

export default Movie;
