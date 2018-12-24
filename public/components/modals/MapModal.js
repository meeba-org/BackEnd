import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import {hideMapModal} from "../../actions/index";
import PropTypes from 'prop-types';

class MapModal extends Component {

    handleClose = () => {
        this.props.dispatch(hideMapModal());
    };

    render() {
        let {open} = this.props;
        return (
            <Dialog onClose={this.handleClose} open={open}>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        סגור
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

MapModal.propTypes = {
    entity: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default connect()(MapModal);
