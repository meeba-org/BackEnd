import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField/TextField";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {hideTaskModal} from "../../actions";

class TaskModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            entity: props.entity
        };
    }

    handleCreateOrUpdateTask = () => {
        let {dispatch, createTask, updateTask, entity} = this.props;

        let updatedTask = {
            ...entity,
            title: this.state.title
        };

        if (this.isNewTask(entity))
            dispatch(createTask(updatedTask));
        else
            dispatch(updateTask(updatedTask));

        dispatch(hideTaskModal());
    };

    isNewTask = (task) => {
        return !task._id;
    };

    handleCancel = () => {
        this.props.dispatch(hideTaskModal());
    };

    render() {
        let {open} = this.props;
        let {entity} = this.state;

        let defaultTitle = (!entity || this.isNewTask(entity)) ? "" : entity.title;
        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"משימה חדשה"}</DialogTitle>
                <DialogContent>
                    <TextField type="text" placeholder={"המשימה שלי"}
                           defaultValue={defaultTitle}
                           value={this.state.title}
                           onChange={(e) => this.setState({title: e.target.value})}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="raised" onClick={() => this.handleCreateOrUpdateTask()}
                            color="primary" autoFocus
                            disabled={!this.state.title}
                    >
                        {!defaultTitle ? "חדש" : "עדכן"}
                    </Button>
                    <Button onClick={this.handleCancel} color="primary">
                        ביטול
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

TaskModal.propTypes = {
    entity: PropTypes.object,
    deleteEntity: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
};

export default connect()(TaskModal);
