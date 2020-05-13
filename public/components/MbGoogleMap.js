import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// TODO is it ok hard coded?
const API_KEY = "AIzaSyAgOEl4xMnzBoHSR9CQndSMRafzL3_EeEE";
const DEFAULT_LOCATION = {
    latitude: 32.783408,
    longitude: 35.025506
};

const MbGoogleMap = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places&language=iw`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, width: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(({location = DEFAULT_LOCATION}) =>
    (<GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}
    >
        <Marker position={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}  />
    </GoogleMap>)
);

export default MbGoogleMap;
