import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from 'prop-types';
import {hideTaskModal} from "../../actions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";

class TaskModal extends Component {

    state = {
        title: ""
    };

    handleCreateTask = () => {
        let {dispatch, createTask, task} = this.props;

        let updatedTask = {
            ...task,
            title: this.state.title
        };

        dispatch(createTask(updatedTask));
        dispatch(hideTaskModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideTaskModal());
    };

    render() {
        let {open, task} = this.props;
        let defaultTitle = (!task || !task.title) ? "" : task.title;
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
                    <Button variant="raised" onClick={() => this.handleCreateTask()}
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
