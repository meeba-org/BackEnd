import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Dialog, DialogActions, DialogTitle} from "material-ui";
import {hideDeleteEntityModal} from "../../actions/index";
import PropTypes from 'prop-types';

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
            <Dialog onRequestClose={this.handleCancel} open={open}>
                <DialogTitle>{"האם אתה בטוח?"}</DialogTitle>
                <DialogActions>
                    <Button dense raised onClick={() => this.handleDelete()} color="primary" autoFocus>
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
    open: PropTypes.bool.isRequired
};

export default connect()(DeleteModal);
