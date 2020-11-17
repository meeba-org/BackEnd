import React from "react";
import {Map, Marker} from 'google-maps-react';
import {useSelector} from "react-redux";
import {isDesktop} from "../selectors";

const MbGoogleMap = ({location}) => {
    const desktop = useSelector(isDesktop);

    return (
        <Map google={window.google} zoom={14}
             containerStyle={{height: '400px', width: desktop ? '550px' : '100%', position: 'relative'}}
             initialCenter={location}
        >
            <Marker
                position={location}
                label={{
                    text: "10:14",
                    fontWeight: "bold"
                    // fontFamily: "Arial",
                    // fontSize: "10px",
                }}
                icon={{
                    // anchor: new window.google.maps.Point(53,53),
                    labelOrigin: new window.google.maps.Point(53,15),
                }}
            >
                <div>10:00</div>
            </Marker>
        </Map>
    );
};

export default MbGoogleMap;
