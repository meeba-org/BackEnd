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
import MbGoogleMap2 from "../MbGoogleMap2";
import MbPlacesAutocomplete from "../workplace/MbPlacesAutocomplete";
import {EModalType} from "./EModalType";

const useStyles = makeStyles({
    price: {
        marginLeft: "5px",
    },
    contentRoot: {
        paddingLeft: props => props.isDesktop ? "100px" : "10px",
        paddingRight: props => props.isDesktop ? "100px" : "10px",
    },
    line: {
        flexDirection: "row"
    },
    root: {
       paddingTop: "30px"
   }
});

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

    return (
        <Dialog onClose={onClose} open={open} classes={{paper: classes.dialogContentRoot}}>
            <DialogContent>
                <MbPlacesAutocomplete location={workplace.location} onSelect={handleAddressChange}/>
                <MbGoogleMap2 location={workplace.location} onClick={handleMapLocationChange} center={mapCenter}/>
            </DialogContent>
            <DialogActions classes={{root: classes.dialogActions}}>
                <Button variant="contained" onClick={onSave} color="primary" autoFocus>שמור</Button>
                <Button onClick={onClose} color="primary">סגור</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkplaceSelectionModal;
