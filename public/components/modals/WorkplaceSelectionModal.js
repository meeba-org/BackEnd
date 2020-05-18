import {DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hideModal} from "../../actions";
import {fetchDeviceLocation} from "../../helpers/googleMapsService";
import {isDesktop} from "../../selectors";
import PlacesAutocomplete from "../workplace/PlacesAutocomplete";
import WorkplaceMap from "../workplace/WorkplaceMap";
import {EModalType} from "./EModalType";

const WorkplaceSelectionModal = ({open, onSave}) => {
    const isDesktop0 = useSelector(isDesktop);
    const classes = useStyles({isDesktop: isDesktop0});
    const dispatch = useDispatch();
    const [workplace, setWorkplace] = useState({});
    const [mapCenter, setMapCenter] = useState({});

    const handleAddressChange = location => {
        setMapCenter(location);
        handleWorkspaceLocationChange(location);
    };

    const handleMapLocationChange = location => handleWorkspaceLocationChange(location);
    const handleWorkspaceLocationChange = (location) => setWorkplace({...workplace, location});
    const onClose = () => dispatch(hideModal(EModalType.WORKPLACE_SELECTION));

    useEffect(() => {
        fetchDeviceLocation(deviceLocation => {
            setMapCenter(deviceLocation);
            handleWorkspaceLocationChange(deviceLocation);
        });
    }, [mapCenter]);

    const onClickSave = workspace => {
        onSave(workspace);
        onClose();
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>הוספת מקום עבודה</DialogTitle>
            <DialogContent>
                <PlacesAutocomplete location={workplace.location} onSelect={handleAddressChange}
                                    style={classes.autocomplete}/>
                <WorkplaceMap location={workplace.location} onClick={handleMapLocationChange} center={mapCenter}/>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => onClickSave(workplace)} color="primary"
                        autoFocus>שמור</Button>
                <Button onClick={onClose} color="primary">סגור</Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles({
    autocomplete: {
        marginBottom: 10
    }
});

export default WorkplaceSelectionModal;
