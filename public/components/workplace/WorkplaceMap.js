import {Map, Marker} from 'google-maps-react';
import React from "react";
import {useSelector} from "react-redux";
import {isDesktop} from "../../selectors";

const WorkplaceMap = ({onClick, location, center, initMap}) => {
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
        </Map>
    );
};

export default WorkplaceMap;
