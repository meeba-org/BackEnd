import {DialogContent, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {hideDeleteEntityModal} from "../../actions/index";
import moment from "moment";

class DeleteModal extends Component {

    handleDelete = () => {
        let {dispatch, deleteEntity, entity, month, year} = this.props;

        dispatch(deleteEntity(entity, month, year));
        dispatch(hideDeleteEntityModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideDeleteEntityModal());
    };

    render() {
        let {open, entity} = this.props;
        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"האם אתה בטוח?"}</DialogTitle>
                {entity?.clockInTime &&
                <DialogContent>
                    <Typography color={"textSecondary"} variant={"subtitle1"} align={"center"}>
                    {moment(entity?.clockInTime).format("DD/MM/YYYY hh:mm")}
                    </Typography>
                </DialogContent>
                }
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
    month: PropTypes.number,
    year: PropTypes.number,
};

export default connect()(DeleteModal);
