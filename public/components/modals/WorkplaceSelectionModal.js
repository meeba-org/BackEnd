import {DialogTitle, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {hideModal} from "../../actions";
import {getPlace, getPlaceByLocation} from "../../helpers/googleMapsService";
import "../../styles/WorkplaceSelectionModal.scss";
import PlacesAutocomplete from "../workplace/PlacesAutocomplete";
import WorkplaceMap from "../workplace/WorkplaceMap";
import {EModalType} from "./EModalType";

const WorkplaceSelectionModal = ({open, onSave, orgWorkplace}) => {
    if (!orgWorkplace)
        return null;

    const dispatch = useDispatch();
    const [workplace, setWorkplace] = useState({});
    const [place, setPlace] = useState({});
    const [mapCenter, setMapCenter] = useState({});
    const [map, setMap] = useState(null);

    const handleSelection = prediction => {
        if (!prediction)
            return;

        handleChange("placeId", prediction.place_id);
    };

    const handleChange = (key, value) => {
        setWorkplace({
            ...workplace,
            [key]: value
        });
    };

    const handleMapLocationChange = async location => {
        const placeByLocation = await getPlaceByLocation(location);

        handleChange("placeId", placeByLocation.place_id);
    };

    const initMap = (mapProps, map) => {
        setMap(map);
    };

    const onClose = () => dispatch(hideModal(EModalType.WORKPLACE_SELECTION));

    // useEffect(() => {
    //     fetchDeviceLocation(deviceLocation => {
    //         setMapCenter(deviceLocation);
    //         handleChange("location", deviceLocation);
    //     });
    // }, []);

    const fetchPlace = async () => {
        if (workplace?.placeId) {
            const place = await getPlace(workplace.placeId, map);
            setPlace(place);
            setMapCenter({
                lng: place?.geometry.location.lng(),
                lat: place?.geometry.location.lat(),
            });
        }
    };

    useEffect(() => {
        if (!workplace || !map)
            return;

        fetchPlace();
    }, [map, workplace.placeId]);

    useEffect(() => {
        setWorkplace(orgWorkplace);
    }, [orgWorkplace]);

    const onClickSave = wp => {
        onSave(wp);
        onClose();
    };

    const extractLocation = () => ({
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng()
    });

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>הוספת מקום עבודה</DialogTitle>
            <DialogContent>
                <Box display={"flex"} flexDirection="column">
                    <Box display={"flex"} flexDirection="row" justifyContent={"flex-start"} styleName="row">
                        <TextField
                            label="שם"
                            value={workplace.name}
                            type={"text"}
                            onChange={e => handleChange("name", e.target.value)}
                            styleName="field"
                        />
                        <TextField
                            label="רדיוס (מטרים)"
                            value={workplace.radius}
                            type={"number"}
                            onChange={e => handleChange("radius", e.target.value)}
                            styleName="field"
                        />
                    </Box>
                    <PlacesAutocomplete
                        place={place}
                        onSelect={handleSelection}
                    />
                    <WorkplaceMap location={extractLocation()} onClick={handleMapLocationChange} center={mapCenter}
                                  initMap={initMap}/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => onClickSave(workplace)} color="primary"
                        autoFocus>שמור</Button>
                <Button onClick={onClose} color="primary">סגור</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkplaceSelectionModal;
