import React from 'react';

const VideoContainer = ({video}) => {
    return (
        <div >
            <video src={video.url} loop muted controls height={400} autoPlay>
                Hi
            </video>
        </div>
    );
};

export default VideoContainer;
