import React, {Fragment} from "react";
import Switch from "@material-ui/core/Switch";
import '../styles/MbSwitch.scss';
import withStyles from '@material-ui/core/styles/withStyles';

const styles2 = theme => ({
    colorSwitchBase: {
        color: theme.palette.secondary[400],
    },
    bar: {
        backgroundColor: theme.palette.secondary[400],
        opacity: 0.5
    },
});

const MbSwitch = ({firstLabel, secondLabel, checked, onChange, classes}) => {
    return (
        <Fragment>
            <span styleName="switch-label">{firstLabel}</span>
            <Switch
                onChange={onChange}
                checked={checked}
                classes={{
                    switchBase: classes.colorSwitchBase,
                    bar: classes.bar,
                }}
            />
            <span styleName="switch-label">{secondLabel}</span>
        </Fragment>
    );
};

export default withStyles(styles2)(MbSwitch);
