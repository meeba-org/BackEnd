import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from 'prop-types';
import {hideCreateTaskModal} from "../../actions";
import Input from "@material-ui/core/Input";
import DialogContent from "../../../node_modules/@material-ui/core/DialogContent/DialogContent";

class CreateTaskModal extends Component {

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
        dispatch(hideCreateTaskModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideCreateTaskModal());
    };

    render() {
        let {open, task} = this.props;
        let defaultTitle = (!task || !task.title) ? "" : task.title;
        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"משימה חדשה"}</DialogTitle>
                <DialogContent>
                    <Input type="text" placeholder={"המשימה שלי"}
                           defaultValue={defaultTitle}
                           value={this.state.title}
                           onChange={(e) => this.setState({title: e.target.value})}/>
                    <pre>title: {this.state.title}</pre>
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

CreateTaskModal.propTypes = {
    entity: PropTypes.object,
    deleteEntity: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
};

export default connect()(CreateTaskModal);
