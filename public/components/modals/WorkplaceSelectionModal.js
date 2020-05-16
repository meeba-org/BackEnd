import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {makeStyles} from '@material-ui/core/styles';
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hideModal} from "../../actions";
import {isDesktop} from "../../selectors";
import MbGoogleMap2 from "../MbGoogleMap2";
import PlacesAutocomplete from "../workplace/PlacesAutocomplete";
import {EModalType} from "./EModalType";

const useStyles = makeStyles({
    // paperRoot: {
    //     paddingTop: "20px",
    // },
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

const WorkplaceSelectionModal = ({wp = {}, open, onSave}) => {
    const isDesktop0 = useSelector(isDesktop);
    const classes = useStyles({isDesktop: isDesktop0});
    const dispatch = useDispatch();
    const [workplace, setWorkplace] = useState(wp);
    // const workplace = {
    //     name: "בית2",
    //     location: {
    //         latitude: 32.783408,
    //         longitude: 35.025506
    //     },
    //     radius: 100
    // };

    const handleWorkspaceLocationChange = (location) => setWorkplace({...workplace, location});
    const onClose = () => dispatch(hideModal(EModalType.WORKPLACE_SELECTION));

    return (
        <Dialog onClose={onClose} open={open} classes={{paper: classes.dialogContentRoot}}>
            <DialogContent>
                <PlacesAutocomplete location={workplace.location} onClick={handleWorkspaceLocationChange}/>
                <MbGoogleMap2 location={workplace.location} onClick={handleWorkspaceLocationChange}/>
            </DialogContent>
            <DialogActions classes={{root: classes.dialogActions}}>
                <Button variant="contained" onClick={onSave} color="primary" autoFocus>שמור</Button>
                <Button onClick={onClose} color="primary">סגור</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkplaceSelectionModal;
