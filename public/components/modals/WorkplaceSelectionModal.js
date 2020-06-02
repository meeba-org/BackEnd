import {DialogTitle, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {hideModal} from "../../actions";
import {fetchDeviceLocation, getPlace, getPlaceByLocation} from "../../helpers/googleMapsService";
import "../../styles/WorkplaceSelectionModal.scss";
import PlacesAutocomplete from "../workplace/PlacesAutocomplete";
import WorkplaceMap from "../workplace/WorkplaceMap";
import {EModalType} from "./EModalType";

const WorkplaceSelectionModal = ({open, onSave, orgWorkplace}) => {

    const dispatch = useDispatch();
    const [workplace, setWorkplace] = useState(orgWorkplace);
    const [place, setPlace] = useState({});
    const [mapCenter, setMapCenter] = useState({});
    const [map, setMap] = useState(null);

    useEffect(() => {
        // Setting the workplace so we can have something to edit if needed
        setWorkplace(orgWorkplace);
    }, [orgWorkplace]);

    useEffect(() => {
        // If there is no placeId in workplace getting the device location and translate it to placeId
        if (!workplace?.placeId) {
            fetchDeviceLocation(deviceLocation => {
                handleMapLocationChange(deviceLocation);
            });
        }
    }, [workplace?.placeId]);

    useEffect(() => {
        if (!workplace?.placeId || !map)
            return;

        // Once we have placeId and map object we retrieve the google map Place object
        fetchPlace();
    }, [map, workplace?.placeId]);

    /**
     * User select an autocomplete prediction and we saving the placeId in our workplace
     * @param prediction
     */
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

    /**
     * User change the location
     * @param location
     * @return {Promise<void>}
     */
    const handleMapLocationChange = async location => {
        const placeByLocation = await getPlaceByLocation(location);

        handleChange("placeId", placeByLocation.place_id);
    };

    const initMap = (mapProps, map) => {
        setMap(map);
    };

    const onClose = () => dispatch(hideModal(EModalType.WORKPLACE_SELECTION));

    const fetchPlace = async () => {
        if (workplace?.placeId) {
            const place = await getPlace(workplace.placeId, map);
            setPlace(place);
            const newLocation = {
                lng: place?.geometry.location.lng(),
                lat: place?.geometry.location.lat(),
            };
            setMapCenter(newLocation);
            handleChange("location", newLocation);
        }
    };

    const onClickSave = wp => {
        onSave(wp);
        onClose();
    };

    const isSaveEnable = () => {
        return !!workplace.name && workplace.radius && workplace.placeId && workplace.location;
    };

    const extractLocation = () => ({
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng()
    });

    if (!workplace)
        return null;

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
                            autoFocus
                            error={!workplace.name}
                        />
                        <TextField
                            label="רדיוס (מטרים)"
                            value={workplace.radius}
                            type={"number"}
                            onChange={e => handleChange("radius", parseInt(e.target.value))}
                            styleName="field"
                            error={!workplace.radius}
                        />
                    </Box>
                    <PlacesAutocomplete
                        place={place}
                        onSelect={handleSelection}
                    />
                    <WorkplaceMap
                        location={extractLocation()}
                        onClick={handleMapLocationChange}
                        center={mapCenter}
                        initMap={initMap}
                        radius={workplace.radius}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => onClickSave(workplace)}
                    color="primary"
                    autoFocus
                    disabled={!isSaveEnable()}>
                    שמור
                </Button>
                <Button onClick={onClose} color="primary">סגור</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkplaceSelectionModal;
