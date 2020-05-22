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
            />
        </Map>
    );
};

export default MbGoogleMap;
