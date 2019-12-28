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
import {ESplashScreenType} from "../../helpers/SplashScreenHelper";

class YesNoModal extends Component {

    render() {
        let {open, hideModal} = this.props;

        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"ימי היעדרות"}</DialogTitle>
                <DialogContent >
                    <Typography variant="h4" gutterBottom>
                        היי!
                    </Typography>
                    <Typography variant="h6" gutterBottom align="center">
                        אתה משתמש במיבא כבר זמן מה - מה דעתך? 👨🏻‍💻
                    </Typography>
                    <div style={{flexDirection: "row", textAlign: "center", marginBottom: "10px"}}>
                        <Button style={{fontSize: "24px"}} target="_blank" href="https://www.quicksurveys.com/s/Gb5n4" variant="contained" color="primary" >סקר 2019</Button>
                    </div>
                    <Typography variant="h6" gutterBottom align="center">
                        ⭐ חודש חינם במסלול פרמיום לעונים! ⭐
                    </Typography>
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
    hideModal: () => hideModal(ESplashScreenType.NEW_FEATURE_ABSENCE_DAYS),
};

export default connect(null, mapDispatchToProps)(YesNoModal);
