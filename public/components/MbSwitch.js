import {Typography} from '@material-ui/core';
import Switch from "@material-ui/core/Switch";
import React from "react";
import '../styles/MbSwitch.scss';

const MbSwitch = ({firstLabel, secondLabel, checked, onChange}) => {
    return (
        <div styleName="container">
            <Typography variant={"body2"} styleName="switch-label">{firstLabel}</Typography>
            <Switch
                onChange={onChange}
                checked={checked}
                style={{height: "initial"}}
            />
            <Typography variant={"body2"} styleName="switch-label">{secondLabel}</Typography>
        </div>
    );
};

export default MbSwitch;
