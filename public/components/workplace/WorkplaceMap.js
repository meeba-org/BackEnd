import {Map, Marker, Circle} from 'google-maps-react';
import React from "react";
import {useSelector} from "react-redux";
import {isDesktop} from "../../selectors";

const WorkplaceMap = ({onClick, location, center, initMap, radius}) => {
    const desktop = useSelector(isDesktop);

    const onMapClicked = (mapProps, map, clickEvent) => {
        onClick({
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        });
    };

    return (
        <Map google={window.google} zoom={14}
             containerStyle={{height: '400px', width: desktop ? '550px' : '100%', position: 'relative'}}
             center={center}
             onClick={onMapClicked}
             onReady={initMap}
        >
            <Marker
                position={location}
            />
            <Circle
                radius={radius}
                center={center}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='green'
                fillOpacity={0.2}
            />
        </Map>
    );
};

export default WorkplaceMap;
