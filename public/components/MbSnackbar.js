import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import {makeStyles} from '@material-ui/core/styles';
import CloseIcon from "@material-ui/icons/Close";
import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {showGoPremiumModal} from "../actions";

const useStyles = makeStyles({
    root: {
        background: "#A1565C",
    }
});

const MbSnackbar = () => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClose = () => setOpen(false);

    const onClick = () => {
        handleClose();
        dispatch(showGoPremiumModal());
    };

    return (
        <Snackbar
            autoHideDuration={2000}
            ContentProps={{
                classes: {
                    root: classes.root
                }
            }}
            open={open}
            onClose={handleClose}
            message={<Box fontSize={16}>{"אנחנו רוצים לתמוך בך 🙏🏻 - עכשיו מנוי חודשי ב-10 שח בלבד"}</Box>}
            action={
                <>
                    <Button color="secondary" fontSize={16} onClick={onClick}>
                        פרטים
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
            }
        />
    );
};

export default MbSnackbar;
