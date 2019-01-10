import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {hideDeleteEntityModal} from "../../actions/index";
import PropTypes from 'prop-types';
import {hideCreateTaskModal} from "../../actions";

class CreateTaskModal extends Component {

    handleCreateTask = () => {
        let {dispatch, createTask, title} = this.props;

        dispatch(createTask({title}));
        dispatch(hideCreateTaskModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideCreateTaskModal());
    };

    render() {
        let {open} = this.props;
        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"משימה חדשה"}</DialogTitle>
                <DialogActions>
                    <Button variant="raised" onClick={() => this.handleDelete()} color="primary" autoFocus>
                        צור
                    </Button>
                    <Button onClick={this.handleCancel} color="primary">
                        ביטול
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CreateTaskModal.propTypes = {
    entity: PropTypes.object,
    deleteEntity: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
};

export default connect()(CreateTaskModal);
