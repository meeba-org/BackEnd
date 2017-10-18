import React, {Component} from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import {calculateCurrentDay} from "../helpers/utils";
import moment from "moment";

class AddShiftsDialog extends Component {

    render() {
        let {onCancel, onCreate, open} = this.props;
        let startTime = moment(8, "HH");
        let endTime = moment(startTime).add(8, 'hours');

        return (
            <Dialog open={open} onRequestClose={onCancel}>
                <DialogTitle>הוספת משמרת</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                        {/*To subscribe to this website, please enter your email address here. We will send*/}
                        {/*updates occationally.*/}
                    {/*</DialogContentText>*/}
                    <TextField className="daily-date" type="date" defaultValue={calculateCurrentDay()} placeholder="תאריך"
                               onChange={(e) => this.handleChange(e)} />

                    <TextField className="elem" type="time" defaultValue={startTime.format("HH:MM")} placeholder="כניסה"
                               // onChange={(e) => this.onUpdateStartTime(e, "clockOutTime")}
                    />
                    <TextField className="elem" type="time" defaultValue={endTime.format("HH:MM")} placeholder="יציאה"
                               // onChange={(e) => this.onUpdateEndTime(e, "clockOutTime")}
                    />

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
