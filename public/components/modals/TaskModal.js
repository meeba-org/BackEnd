import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField/TextField";
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {hideTaskModal} from "../../actions";

export const TaskModalContent = ({entity, isNewTask, onKeyPress, onOk, onCancel, onChangeTitle}) => {
    return (
        <Fragment>
            <DialogTitle>{"משימה חדשה"}</DialogTitle>
            <DialogContent>
                <TextField type="text" placeholder={"המשימה שלי"}
                           value={entity.title}
                           onChange={(e) => onChangeTitle(e.target.value)}
                           onKeyPress={onKeyPress}
                           autoFocus
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onOk}
                        color="primary" autoFocus
                        disabled={!entity.title}
                >
                    {isNewTask ? "חדש" : "עדכן"}
                </Button>
                <Button onClick={onCancel} color="primary">
                    ביטול
                </Button>
            </DialogActions>
        </Fragment>
    );
};

class TaskModal extends Component {

    state = {
        entity: {}
    };

    handleCreateOrUpdateTask = () => {
        let {dispatch, createTask, updateTask} = this.props;
        const {entity} = this.state;

        if (this.isNewTask())
            dispatch(createTask(entity));
        else
            dispatch(updateTask(entity));

        dispatch(hideTaskModal());
    };

    isNewTask = () => {
        let entity = this.props.entity;

        if (!entity)
            return false;
        return !entity._id;
    };

    handleCancel = () => {
        this.props.dispatch(hideTaskModal());
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleCreateOrUpdateTask();
        }
    };

    onChangeTitle = (title) => {
        this.setState({entity: {
                ...this.state.entity,
                title
            }});
    };

    render() {
        let {open} = this.props;
        let {entity} = this.state;

        return (
            <Dialog onClose={this.handleCancel} open={open}
                    onEnter={() => {
                        this.setState({entity: this.props.entity});
                    }}
            >
                <TaskModalContent
                    entity={entity}
                    isNewTask={this.isNewTask()}
                    onOk={this.handleCreateOrUpdateTask}
                    onKeyPress={this.onKeyPress}
                    onCancel={this.handleCancel}
                    onChangeTitle={this.onChangeTitle}
                />
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
