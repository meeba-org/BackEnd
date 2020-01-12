import React from "react";
import { compose, withProps } from "recompose";
import Marker from "react-google-maps/lib/components/Marker";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import GoogleMap from "react-google-maps/lib/components/GoogleMap";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";

const API_KEY = "AIzaSyAgOEl4xMnzBoHSR9CQndSMRafzL3_EeEE";

const MbGoogleMap = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places&language=iw`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    (<GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: parseFloat(props.location.latitude), lng: parseFloat(props.location.longitude) }}
    >
        <Marker position={{ lat: parseFloat(props.location.latitude), lng: parseFloat(props.location.longitude) }}  />
    </GoogleMap>)
);

export default MbGoogleMap;
