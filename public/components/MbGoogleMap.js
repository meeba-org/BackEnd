import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MbGoogleMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    (<GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: Number(props.location.latitude), lng: Number(props.location.longitude) }}
    >
        <Marker position={{ lat: Number(props.location.latitude), lng: Number(props.location.longitude) }}  />
    </GoogleMap>)
);

export default MbGoogleMap;
