import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Dialog, DialogActions, DialogTitle} from "material-ui";
import {hideDeleteEntityModal} from "../../actions/index";
import PropTypes from 'prop-types';

class MovingShiftOutOfMonthModal extends Component {

    updateShift = () => {
        let {dispatch, updateShift, entity, month, year} = this.props;

        dispatch(updateShift(entity, dispatch, month, year));
        dispatch(hideDeleteEntityModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideDeleteEntityModal());
    };

    render() {
        let {open} = this.props;
        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"הינך מעביר משמרת לחודש אחר - האם אתה בטוח?"}</DialogTitle>
                <DialogActions>
                    <Button dense raised onClick={() => this.updateShift()} color="primary" autoFocus>
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

MovingShiftOutOfMonthModal.propTypes = {
    entity: PropTypes.object,
    updateShift: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
};

export default connect()(MovingShiftOutOfMonthModal);
