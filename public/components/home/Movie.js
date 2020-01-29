import React, {Component} from 'react';
import "../../styles/Movie.scss";
import YouTube from "react-youtube";
import LazyLoad from 'react-lazyload';
import MobileImageContent from "./MobileImageContent";

class Movie extends Component {
    state = {};

    render() {
        return (
            <LazyLoad>
                <div styleName="movie-container">
                    <div styleName="title">קצת על מיבא...</div>
                    <div styleName="movie-wrapper">
                        {/*<YouTube videoId="oCKVp53Nefo"/>*/}
                        <MobileImageContent />
                    </div>
                </div>
            </LazyLoad>
        );
    }
}

Movie.propTypes = {};
Movie.defaultProps = {};

export default Movie;
