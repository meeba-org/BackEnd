import React, {Fragment, useState} from 'react';
import VideoContainer from "./VideoContainer";
import VideosSideBar from "./VideosSideBar";

const videos = [
    {
        url: "../../styles/videos/ShiftStatus.mp4",
        title: "ניהול משמרת"
    },
    {
        url: "",
        title: "דוח חודשי"
    }
];

const Videos = () => {
    const [video, setVideo] = useState(videos[0]);

    return (
        <div>
            <VideosSideBar onSelect={setVideo} videos={videos} />
            <VideoContainer video={video} />
        </div>
    );
};

export default Videos;
