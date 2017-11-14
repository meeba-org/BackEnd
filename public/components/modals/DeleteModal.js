import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Dialog, DialogActions, DialogTitle} from "material-ui";
import {hideModal} from "../../actions/index";
import PropTypes from 'prop-types';

class DeleteModal extends Component {

    handleDelete = () => {
        let {dispatch, deleteEntity, entity} = this.props;

        dispatch(deleteEntity(entity));
        dispatch(hideModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideModal());
    };

    render() {
        return (
            <div>
                <Dialog open={true}>
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
            </div>
        );
    }
}

DeleteModal.propTypes = {
    entity: PropTypes.object.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect()(DeleteModal);
