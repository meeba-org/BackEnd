import React, {Fragment} from 'react';

const VideosSideBar = ({onSelect, videos}) => {
    return (
        <Fragment>
            {videos.map(video => (
                <div onClick={onSelect}>{video.title}</div>
            ))}
        </Fragment>
    );
};

export default VideosSideBar;
