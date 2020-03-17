import {DialogTitle} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hideModal, showGoPremiumModal} from "../../actions";
import {isDesktop} from "../../selectors";

const useStyles = makeStyles({
    paperRoot: {
        paddingTop: "20px",
    },
    price: {
        marginLeft: "5px",
    },
    contentRoot: {
        paddingLeft: props => props.isDesktop ? "100px" : "10px",
        paddingRight: props => props.isDesktop ? "100px" : "10px",
    },
    line: {
        flexDirection: "row"
    },
    root: {
       paddingTop: "30px"
   }
});

const Covid19DiscountModal = ({open}) => {
    const isDesktop0 = useSelector(isDesktop);
    const classes = useStyles({isDesktop: isDesktop0});
    const dispatch = useDispatch();

    return (
        <Dialog onClose={() => dispatch(hideModal())} open={open} classes={{paper: classes.paperRoot}}>
            <Typography align="center" variant={"h6"}>{"אנחנו רוצים לתמוך בך 🙏🏻"}</Typography>
            <DialogContent classes={{root: classes.contentRoot}}>
                <Typography component="div">
                    <Box display="flex" flexDirection="row" fontSize={isDesktop0 ? "h5.fontSize" : "h6.fontSize"}>
                        הוזלנו את דמי המנוי
                        <Box fontWeight="bold" color={"primary.main"} classes={{root: classes.price}} fontSize={isDesktop0 ? "h5.fontSize" : "h6.fontSize"}>ל-10 ש"ח לחודש</Box>
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
