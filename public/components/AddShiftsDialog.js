import React, {Component} from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class AddShiftsDialog extends Component {

    render() {
        let {onCancel, onCreate, open} = this.props;

        return (
            <Dialog open={open} onRequestClose={onCancel}>
                <DialogTitle>הוספת משמרת</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                        {/*To subscribe to this website, please enter your email address here. We will send*/}
                        {/*updates occationally.*/}
                    {/*</DialogContentText>*/}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCreate} color="primary">
                        הוסף
                    </Button>
                    <Button onClick={onCancel} color="primary">
                        ביטול
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddShiftsDialog.propTypes = {};
AddShiftsDialog.defaultProps = {};

export default AddShiftsDialog;
