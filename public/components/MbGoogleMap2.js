import {Map, Marker} from 'google-maps-react';
import React from "react";

export class MapContainer extends React.Component {
    onMapClicked = (mapProps, map, clickEvent) => {
        const {onClick} = this.props;

        onClick({
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        });
    }

    render() {
        const {location, center} = this.props;

        return (
            <Map google={window.google} zoom={14}
                 containerStyle={{height: '400px', width: '550px', position: 'relative'}}
                 center={center}
                 onClick={this.onMapClicked}
            >
                <Marker
                    name={'Current location'}
                    position={location}
                />
            </Map>
        );
    }
}

export default MapContainer;
