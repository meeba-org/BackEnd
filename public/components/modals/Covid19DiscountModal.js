import {DialogTitle} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import React from 'react';
import {useDispatch} from "react-redux";
import {hideModal, showGoPremiumModal} from "../../actions";

const useStyles = makeStyles({
    paperRoot: {
        paddingTop: "20px",
    },
    price: {
        marginLeft: "5px",
    },
    contentRoot: {
        paddingLeft: "100px",
        paddingRight: "100px",
    },
    line: {
        flexDirection: "row"
    },
    root: {
       paddingTop: "30px"
   }
});

const Covid19DiscountModal = ({open}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Dialog onClose={() => dispatch(hideModal())} open={open} classes={{paper: classes.paperRoot}}>
            <DialogTitle><Typography align="center" variant={"h6"}>{"אנחנו רוצים לתמוך בך 🙏🏻"}</Typography></DialogTitle>
            <DialogContent classes={{root: classes.contentRoot}}>
                <Typography>
                    <Box display="flex" flexDirection="row" fontSize={"h5.fontSize"}>
                        הוזלנו את דמי המנוי
                        <Box fontWeight="bold" color={"primary.main"} classes={{root: classes.price}}>ל-10 ש"ח לחודש</Box>
                    </Box>
                    <Box fontSize="h6.fontSize" textAlign="center">(במקום 100 ש"ח)</Box>
                    <Box fontSize="body1.fontSize" textAlign="center" classes={{root: classes.root}}>ההטבה היא עד הודעה חדשה.</Box>
                    <Box fontSize="body1.fontSize" textAlign="center">אנא שמרו על עצמכם.</Box>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(hideModal())} color="primary">הבנתי, תודה</Button>
                <Button onClick={() => {
                    dispatch(hideModal());
                    dispatch(showGoPremiumModal());
                }} color="primary" variant="contained">מה נותן מנוי?</Button>
            </DialogActions>
        </Dialog>
    );
};
export default Covid19DiscountModal;
