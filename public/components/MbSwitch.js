import React, {Fragment} from "react";
import Switch from "@material-ui/core/Switch";
import '../styles/MbSwitch.scss';
import {Typography} from '@material-ui/core';

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
