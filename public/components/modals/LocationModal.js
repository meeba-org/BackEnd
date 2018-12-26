import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import {hideLocationModal} from "../../actions/index";
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";

// const GoogleMaps = compose(
//     withProps({
//         /**
//          * Note: create and replace your own key in the Google console.
//          * https://console.developers.google.com/apis/dashboard
//          * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
//          */
//         googleMapURL:
//             "https://maps.googleapis.com/maps/api/js?key=" + "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" + "v=3.exp&libraries=geometry,drawing,places",
//         loadingElement: <div style={{ height: `100%` }} />,
//         containerElement: <div style={{ height: `300px` }} />,
//         mapElement: <div style={{ height: `100%` }} />
//     }),
//     withScriptjs,
//     withGoogleMap
// )(props => (
//     <GoogleMap defaultZoom={8} defaultCenter={new google.maps.LatLng(props.location.latitude,  props.location.longitude)}>
//         <Marker position={{ lat: props.location.latitude, lng: props.location.longitude }} />
//     </GoogleMap>
// ));

class LocationModal extends Component {

    handleClose = () => {
        this.props.dispatch(hideLocationModal());
    };

    render() {
        let {open, location} = this.props;
        return (
            <Dialog onClose={this.handleClose} open={open}>
                <DialogContent>
                    <GoogleMap location={location}
                    >
                    </GoogleMap>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        סגור
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

LocationModal.propTypes = {
    entity: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default connect()(withScriptjs(withGoogleMap(LocationModal)));
