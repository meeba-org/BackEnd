import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {hide2019Survey} from "../../actions/index";

class YesNoModal extends Component {

    onAction = () => {
        let {dispatch} = this.props;

        dispatch(hide2019Survey());
    };

    render() {
        let {open} = this.props;

        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>מיבא - סקר 2019</DialogTitle>
                <DialogContent>
                    <Typography variant="h4" gutterBottom>
                        היי!
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        אנחנו מתחילים לסכם שנה ולנסות לעבד וללמוד מכל מה שקרה 🕵️‍♀️ ואנחנו מבקשים את עזרתכם!
                        אנא מלאו את סקר 2019 שלנו - לכל מסיים יינתן *חודש חינם* ✨✨✨ במסלול פרמיום (מיקומי עובד, עובדים ללא הגבלה ועוד).
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button target="_blank" href="https://www.quicksurveys.com/s/Gb5n4" variant="contained" color="primary" >קח אותי לסקר!</Button>
                    <Button onClick={this.onAction} color="primary">סגור</Button>
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

export default connect()(YesNoModal);
