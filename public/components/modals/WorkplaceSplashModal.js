import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import PlaceIcon from "@material-ui/icons/Place";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {hideModal} from "../../actions";
import {isDesktop} from "../../selectors";
import {EModalType} from "./EModalType";

// TODO Clean this
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

const WorkplaceSplashModal = ({open}) => {
    const isDesktop0 = useSelector(isDesktop);
    const classes = useStyles({isDesktop: isDesktop0});
    const dispatch = useDispatch();

    const onClose = () => dispatch(hideModal(EModalType.WORKPLACE_SPLASH));

    return (
        <Dialog onClose={onClose} open={open} classes={{paper: classes.paperRoot}}>
            <Typography align="center" variant={"h6"}>{"חדש ✨ - האם העובד ביצע את הכניסה במקום העבודה?"}</Typography>
            <DialogContent classes={{root: classes.contentRoot}}>
                <Typography component="div">
                    <Box display="flex" flexDirection="column" alignItems="center"
                         fontSize={isDesktop0 ? "h5.fontSize" : "h6.fontSize"}>
                        <Box display="flex" flexDirection="row" justifyContent="space-between" style={{width: "300px"}}>
                            <IconButton><PlaceIcon htmlColor="green"/>כן</IconButton>
                            <IconButton><PlaceIcon htmlColor="red"/>לא</IconButton>
                            <IconButton><PlaceIcon htmlColor="gray"/>לא ידוע</IconButton>
                        </Box>
                    </Box>
                    <Box fontSize="h6.fontSize" textAlign="center">להגדרת מקום העבודה עבור <Link
                        to={"/dashboard/settings"} onClick={onClose}>להגדרות</Link></Box>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => dispatch(hideModal())} color="primary">יפה, תודה!</Button>
            </DialogActions>
        </Dialog>
    );
};
export default WorkplaceSplashModal;
