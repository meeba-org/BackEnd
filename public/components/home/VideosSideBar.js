import {Button, Typography} from "@material-ui/core";
import React from 'react';
import "./styles/VideosSideBar.scss";

const VideosSideBar = ({onSelect, videos, selectedVideo}) => {
    return (
        <div styleName="videos-side-bar">
            {videos.map((video, index) => (
                <Button key={index} styleName="video-item" onClick={() => onSelect(video)}>
                    <Typography
                        color={video === selectedVideo ? "primary" : "initial"}
                        style={{fontWeight: video === selectedVideo ? "bold" : "normal"}}
                        variant={"h5"}
                    >{video.title}</Typography>
                </Button>
            ))}
        </div>
    );
};

export default VideosSideBar;
