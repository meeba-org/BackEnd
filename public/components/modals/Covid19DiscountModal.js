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
class Covid19Discount extends Component {

    render() {
        let {open, hideModal} = this.props;

        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"אנחנו רוצים לתמוך בך"}</DialogTitle>
                <DialogContent>
                    <Typography variant={"subtitle1"}>{"🙄 איך?"}</Typography>
                    <Typography style={{paddingRight: PADDING_RIGHT}} variant={"body1"}>{`מעתה ועד הודעה חדשה דמי מנוי למיבא יוזלו ל-10 שח לחודש (במקום 100).`}</Typography>
                    <Typography style={{paddingRight: PADDING_RIGHT}} variant={"body1"}>{"אנא שימרו על עצמכם והקפידו על ההנחיות."}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideModal} color="primary">סגור</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

Covid19Discount.propTypes = {
    handleAction: PropTypes.func,
    open: PropTypes.bool.isRequired,
};

Covid19Discount.defaultProps = {
    text: ""
};

const mapDispatchToProps = {
    hideModal: () => hideModal(EModalType.COVID19_DISCOUNT)
};

export default connect(null, mapDispatchToProps)(Covid19Discount);
