import React from "react";
import {Map, Marker} from 'google-maps-react';
import {useSelector} from "react-redux";
import {isDesktop} from "../selectors";

const MbGoogleMap = ({locations = []}) => {
    const desktop = useSelector(isDesktop);

    const convertLocation = location => ({
        lat: location.latitude,
        lng: location.longitude
    });

    return (
        <Map google={window.google} zoom={14}
             containerStyle={{height: '400px', width: desktop ? '550px' : '100%', position: 'relative'}}
             initialCenter={convertLocation(locations[0])}
        >
            {locations?.map((location, index) =>
                <Marker
                    position={convertLocation(location)}
                    label={{
                        text: index === 0 ? "יציאה" : "כניסה",
                        fontWeight: "bold"
                    }}
                />
            )}
            
        </Map>
    );
};

export default MbGoogleMap;
