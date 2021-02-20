import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import {connect, useDispatch} from "react-redux";
import {hideLocationModal} from "../../actions/index";
import MbGoogleMap from "../MbGoogleMap";

const styles = {
    dialogContentRoot: {
        display: "flex",
        width: "100%"
    },
    dialogActions: {
        justifyContent: "center"
    }
};

const LocationModal = ({open, locations, classes}) => {
    let dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideLocationModal());
    };
    
    if (!locations)
        return null;

    return (
        <Dialog onClose={handleClose} open={open} classes={{paper: classes.dialogContentRoot}}>
            <DialogContent >
                <MbGoogleMap locations={locations}/>
            </DialogContent>
            <DialogActions classes={{root: classes.dialogActions}}>
                <Button onClick={handleClose} color="primary">
                    סגור
                </Button>
            </DialogActions>
        </Dialog>
    );
};

LocationModal.propTypes = {
    locations: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default connect()(withStyles(styles)(LocationModal));
