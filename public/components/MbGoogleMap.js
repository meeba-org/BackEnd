import React from "react";
import moment from 'moment';
import {Map, Marker} from 'google-maps-react';
import {useSelector} from "react-redux";
import {TIME_FORMAT} from "../helpers/utils";
import {isDesktop} from "../selectors";

const MbGoogleMap = ({locations = []}) => {
    const desktop = useSelector(isDesktop);

    const convertLocation = location => ({
        lat: location.latitude,
        lng: location.longitude
    });

    const formatLabel = location => {
        if (!location.date)
            return null;
        
        return moment(location.date).format(TIME_FORMAT);
    };
    
    return (
        <Map google={window.google} zoom={14}
             containerStyle={{height: '400px', width: desktop ? '550px' : '100%', position: 'relative'}}
             initialCenter={convertLocation(locations[0])}
        >
            {locations?.map((location, index) =>
                (<Marker key={index}
                    position={convertLocation(location)}
                    label={{
                        text: formatLabel(location),
                        fontWeight: "bold"
                    }}
                />)
            )}
            
        </Map>
    );
};

export default MbGoogleMap;
