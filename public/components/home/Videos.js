import React, {useState} from 'react';
import SectionTitle from "./SectionTitle";
import VideoContainer from "./VideoContainer";
import VideosSideBar from "./VideosSideBar";
import "../../styles/Videos.scss";
const videos = [
    {
        url: "../../styles/videos/ShiftStatus.mp4",
        title: "מצב משמרת"
    },
    {
        url: "../../styles/videos/Reports.mp4",
        title: "ניהול משמרות"
    },
    {
        url: "../../styles/videos/Excel.mp4",
        title: "דוח אקסל חודשי"
    },
    {
        url: "../../styles/videos/Location.mp4",
        title: "מיקום העובד"
    },
];

const Videos = () => {
    const [video, setVideo] = useState(videos[0]);

    const onSelect = video => {
          setVideo(video);
    };

    return (
        <div styleName="container">
            <SectionTitle title="איך זה עובד?"/>
            <div styleName="content">
                <VideosSideBar onSelect={setVideo} videos={videos} selectedVideo={video}/>
                <VideoContainer video={video}/>
            </div>
        </div>
    );
};

export default Videos;
