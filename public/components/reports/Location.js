import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PlaceIcon from "@material-ui/icons/Place";
import PropTypes from "prop-types";
import React from "react";
import "./styles/ShiftIndicator.scss";
import {OFFICE, OUTSIDE} from "../../../models/EWorkplaceType";

const Location = ({location, onClick, workplaceType}) => {
    const calcWorkplaceClass = () => {
        if (workplaceType === OUTSIDE)
            return "outside";
        else if (workplaceType === OFFICE)
            return "inside";
        else
            return "";
    };

    if (!location)
        return null;

    return (
        <div styleName="shift-indicator">
            <Tooltip title="מיקום בזמן כניסה למשמרת" placement="top">
                <IconButton styleName={"icon " + calcWorkplaceClass()} onClick={onClick}><PlaceIcon/></IconButton>
            </Tooltip>
        </div>
    );
};

Location.propTypes = {
    location: PropTypes.object,
    onClick: PropTypes.func,
};

export default Location;

