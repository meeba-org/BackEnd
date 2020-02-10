import React from 'react';
import "../../styles/VideoContainer.scss";
import Fade from "../Fade";

const VideoContainer = ({video}) => {
    return (
        <Fade isVisible key={video.title}>
            <video  src={video.url} loop muted controls height={400} autoPlay />
        </Fade>
    );
};

export default VideoContainer;
