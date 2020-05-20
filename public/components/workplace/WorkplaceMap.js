import {Map, Marker} from 'google-maps-react';
import React from "react";

const WorkplaceMap = ({onClick, location, center, initMap}) => {

    const onMapClicked = (mapProps, map, clickEvent) => {
        onClick({
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        });
    };

    return (
        <Map google={window.google} zoom={14}
             containerStyle={{height: '400px', width: '550px', position: 'relative'}}
             center={center}
             onClick={onMapClicked}
             onReady={initMap}
        >
            <Marker
                position={location}
            />
        </Map>
    );
};

export default WorkplaceMap;
