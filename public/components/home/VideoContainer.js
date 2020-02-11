import React from 'react';
import "../../styles/VideoContainer.scss";
import Fade from "../Fade";

const VideoContainer = ({video}) => {
    return (
        <div styleName="video-container">
            <Fade isVisible key={video.title}>
                <video src={video.url} loop muted controls height={400} autoPlay />
            </Fade>
        </div>
    );
};

export default VideoContainer;
