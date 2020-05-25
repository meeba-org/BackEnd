import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField/TextField";
import React from "react";

const TaskModalContent = ({task, open, isNewTask, onKeyPress, onOk, onCancel, onChange}) => {
    if (!task)
        return null;

    return (
        <Dialog onClose={onCancel} open={open}>
            <DialogTitle>{"משימה חדשה"}</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column">
                    <TextField type="text" placeholder={"המשימה שלי"}
                               value={task.title}
                               onChange={(e) => onChange("title", e.target.value)}
                               onKeyPress={onKeyPress}
                               autoFocus
                    />
                    <FormControlLabel
                        control={<Checkbox checked={task.isInnovative}
                                           onChange={e => onChange("isInnovative", e.target.checked)}
                                           name="משימת מדען ראשי"/>}
                        label="משימת מדען ראשי"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onOk}
                        color="primary" autoFocus
                        disabled={!task.title}
                >
                    {isNewTask ? "חדש" : "עדכן"}
                </Button>
                <Button onClick={onCancel} color="primary">
                    ביטול
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskModalContent;
