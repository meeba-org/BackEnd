import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import {hideLocationModal} from "../../actions/index";
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import MbGoogleMap from "../MbGoogleMap";

class LocationModal extends Component {

    handleClose = () => {
        this.props.dispatch(hideLocationModal());
    };

    render() {
        let {open, entity} = this.props;
        return (
            <Dialog onClose={this.handleClose} open={open}>
                <DialogContent>
                    {entity && entity.location &&
                        <MbGoogleMap location={entity.location}/>
                    }
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

export default connect()(LocationModal);
