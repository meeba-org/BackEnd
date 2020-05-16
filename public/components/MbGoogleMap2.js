import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import React from "react";
import {GOOGLE_MAP_API_KEY} from "../../config";

export class MapContainer extends React.Component {
    state = {
        selectedPlace: {
            name: "Haifa"
        },
        center: {
            lat: 42.39,
            lng: -72.52
        }
    }

    onMarkerClick = (mark) => {
        // console.log(mark);
    }

    onMapClicked = (mapProps, map, clickEvent) => {
        const {onClick} = this.props;

        onClick({
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        });
    }

    render() {
        const {google, location} = this.props;

        return (
            <Map google={google} zoom={14}
                 containerStyle={{height: '400px', width: '400px', position: 'relative'}}
                 center={location}
                 onClick={this.onMapClicked}
            >

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Current location'}
                    position={location}
                />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (GOOGLE_MAP_API_KEY)
})(MapContainer);
