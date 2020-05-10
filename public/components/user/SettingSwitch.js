import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Link} from "react-router-dom";
import "../../styles/SettingSwitch.scss";

const SettingSwitch = ({value, fieldValue, text, link, handleCompanySettingsChange}) => {
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
                    />
                }
                label={<Typography variant={"body2"}>{text}</Typography>}
            />
            {link &&
            <Typography variant={"caption"}>
                <Link to={link} target="_blank">מה זה?</Link>
            </Typography>
            }
        </div>
    );
};

export default SettingSwitch;
