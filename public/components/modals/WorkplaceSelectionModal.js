import {DialogTitle, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {hideModal} from "../../actions";
import {fetchDeviceLocation} from "../../helpers/googleMapsService";
import "../../styles/WorkplaceSelectionModal.scss";
import PlacesAutocomplete from "../workplace/PlacesAutocomplete";
import WorkplaceMap from "../workplace/WorkplaceMap";
import {EModalType} from "./EModalType";

const WorkplaceSelectionModal = ({open, onSave}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [workplace, setWorkplace] = useState({});
    const [mapCenter, setMapCenter] = useState({});
    const [name, setName] = useState("");
    const [radius, setRadius] = useState(100);

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
                <Box display={"flex"} flexDirection="column">
                    <Box display={"flex"} flexDirection="row" justifyContent={"flex-start"} styleName="row">
                        <TextField
                            label="שם"
                            value={name}
                            type={"text"}
                            onChange={e => setName(e.target.value)}
                            styleName="field"
                        />
                        <TextField
                            label="רדיוס (מטרים)"
                            value={radius}
                            type={"number"}
                            onChange={e => setRadius(e.target.value)}
                            styleName="field"
                        />
                    </Box>
                    <PlacesAutocomplete
                        location={workplace.location}
                        onSelect={handleAddressChange}
                    />
                    <WorkplaceMap location={workplace.location} onClick={handleMapLocationChange} center={mapCenter}/>
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

const useStyles = makeStyles({
    row: {
        marginBottom: 10
    }
});

export default WorkplaceSelectionModal;
