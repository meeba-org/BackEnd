import React, {useState} from 'react';
import SectionTitle from "./SectionTitle";
import VideoContainer from "./VideoContainer";
import VideosSideBar from "./VideosSideBar";
import "../../styles/Videos.scss";
const videos = [
    {
        url: "../../styles/videos/ShiftStatus.mp4",
        title: "ניהול משמרת"
    },
    {
        url: "../../styles/videos/ShiftStatus.mp4",
        title: "דוח חודשי"
    }
];

const Videos = () => {
    const [video, setVideo] = useState(videos[0]);

    return (
        <div styleName="container">
            <SectionTitle title="הנה זה בפעולה"/>
            <div styleName="content">
                <VideosSideBar onSelect={setVideo} videos={videos} selectedVideo={video}/>
                <VideoContainer video={video}/>
            </div>
        </div>
    );
};

export default Videos;
