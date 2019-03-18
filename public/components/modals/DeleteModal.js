import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {hideDeleteEntityModal} from "../../actions/index";

class DeleteModal extends Component {

    handleDelete = () => {
        let {dispatch, deleteEntity, entity, month, year} = this.props;

        dispatch(deleteEntity(entity, dispatch, month, year));
        dispatch(hideDeleteEntityModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideDeleteEntityModal());
    };

    render() {
        let {open} = this.props;
        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"האם אתה בטוח?"}</DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={() => this.handleDelete()} color="primary" autoFocus>
                        כן
                    </Button>
                    <Button onClick={this.handleCancel} color="primary">
                        לא
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

DeleteModal.propTypes = {
    entity: PropTypes.object,
    deleteEntity: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
};

export default connect()(DeleteModal);
