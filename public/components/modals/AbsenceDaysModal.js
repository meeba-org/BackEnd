import {DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {hideModal} from "../../actions";
import {EModalType} from "./EModalType";

const PADDING_RIGHT = 20;
class YesNoModal extends Component {

    render() {
        let {open, hideModal} = this.props;

        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"עכשיו עובד יכול לדווח על ימי חופש / מחלה / מילואים"}</DialogTitle>
                <DialogContent>
                    <Typography variant={"subtitle1"}>{"🙄 איך?"}</Typography>
                    <Typography style={{paddingRight: PADDING_RIGHT}} variant={"body1"}>{`💁🏻‍♂️ הגדרות  ☚ סמן "ימי היעדרות"`}</Typography>
                    <Typography variant={"subtitle1"}>{"🙄 ואז מה?"}</Typography>
                    <Typography style={{paddingRight: PADDING_RIGHT}} variant={"body1"}>{"💁🏻‍♂️ כעת לעובד תהיה את האפשרות בסלולרי להוסיף יום היעדרות"}</Typography>
                    <Typography style={{paddingRight: PADDING_RIGHT}} variant={"body1"}>{`💁🏻‍♂️ אתה כמנהל תוכל לראות את כל ימי החופש / מחלה / מילואים תחת "משימות"`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideModal} color="primary">סגור</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

YesNoModal.propTypes = {
    handleAction: PropTypes.func,
    open: PropTypes.bool.isRequired,
};

YesNoModal.defaultProps = {
    text: ""
};

const mapDispatchToProps = {
    hideModal: () => hideModal(EModalType.NEW_FEATURE_ABSENCE_DAYS)
};

export default connect(null, mapDispatchToProps)(YesNoModal);
