import Typography from "@material-ui/core/Typography";
import React, {Component} from 'react';
import {connect} from "react-redux";
import "../../styles/MobileAppLinksModal.scss";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {hideMobileAppModal} from "../../actions/index";
import PropTypes from 'prop-types';

class MobileAppLinksModal extends Component {

    handleCancel = () => {
        this.props.dispatch(hideMobileAppModal());
    };

    render() {
        let {open} = this.props;
        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"העתק הודעה זו ושלח לעובדים:"}</DialogTitle>
                <DialogContent styleName="content">
                    <Typography styleName="header">עובד יקר,</Typography>
                    <Typography>התחלנו להשתמש בשעון הנוכחות "מיבא".</Typography>
                    <Typography styleName="header">אנא הורד את האפליקציה:</Typography>
                    <Typography>אנדרואיד - https://goo.gl/iGzWxX</Typography>
                    <Typography>או ​</Typography>
                    <Typography>אייפון - https://goo.gl/L6WKJc</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        סגור
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

MobileAppLinksModal.propTypes = {
    entity: PropTypes.object,
    deleteEntity: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
};

export default connect()(MobileAppLinksModal);
