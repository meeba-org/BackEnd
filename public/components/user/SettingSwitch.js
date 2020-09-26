import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import React from "react";
import "./styles/SettingSwitch.scss";
import WhatIsIt from "../WhatIsIt";

const SettingSwitch = ({value, fieldValue, text, link, handleCompanySettingsChange, disabled}) => {
    return (
        <div styleName="switch">
            <FormControlLabel
                control={
                    <Switch
                        style={{height: "initial"}}
                        checked={value}
                        onChange={(e) => {
                            handleCompanySettingsChange(fieldValue, e.target.checked);
                        }}
                        value={value}
                        color="primary"
                        disabled={disabled}
                    />
                }
                label={<Typography variant={"body2"}>{text}</Typography>}
            />
            <WhatIsIt link={link}/>
        </div>
    );
};

export default SettingSwitch;
