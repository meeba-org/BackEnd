import React from "react";
import moment from 'moment';
import {Map, Marker} from 'google-maps-react';
import {useSelector} from "react-redux";
import {TIME_FORMAT} from "../helpers/utils";
import {isDesktop} from "../selectors";

const MbGoogleMap = ({locations = []}) => {
    const desktop = useSelector(isDesktop);


    // Marker settings https://stackoverflow.com/a/23163930/1846993
    const pinSVGHole = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
    const labelOriginHole = new window.google.maps.Point(12, 25);

    const createMarker = (isOOO = true) => ({
        path: pinSVGHole,
        anchor: new window.google.maps.Point(12,17),
        fillOpacity: 1,
        fillColor: isOOO ? "red" : "green",
        strokeWeight: 2,
        strokeColor: "black",
        scale: 2,
        labelOrigin: labelOriginHole
    });
    
    const convertLocation = location => ({
        lat: location.latitude,
        lng: location.longitude
    });

    const formatLabel = location => {
        if (!location.date)
            return undefined;
        
        return moment(location.date).format(TIME_FORMAT);
    };
    
    return (
        <Map google={window.google} zoom={14}
             containerStyle={{height: '400px', width: desktop ? '550px' : '100%', position: 'relative'}}
             initialCenter={convertLocation(locations[0])}
        >
            {locations?.map((location, index) =>
                (<Marker
                    key={index}
                    position={convertLocation(location)}
                    icon={createMarker()}
                    label={{
                        text: formatLabel(location),
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold"
                    }}
                />)
            )}
            
        </Map>
    );
};

export default MbGoogleMap;
