import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import CSSModules from "react-css-modules";
import styles from '../../styles/User.scss';
import NoData from "../NoData";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";

const styles1 = () => ({
    switch: {
        marginRight: "0px"
    },
    formControl: {
        width: "100%"
    },
});

class User extends Component {
    handleUserChange = (field, e) => {
        const {onUpdateUser, input} = this.props;
        const value = e.target.value;

        let user = {
            ...input.value,
            [field]: value
        };

        input.onChange(user);
        onUpdateUser(user);
    };

    handleCompanyChange = (field, e) => {
        const {onUpdateCompany, input} = this.props;
        const value = e.target.value;

        let user = {
            ...input.value,
        };

        user.company = {
            ...input.value.company,
            [field]: value
        };

        input.onChange(user);
        onUpdateCompany(user.company);
    };

    handleCompanySettingsChange = (field, value) => {
        const {onUpdateCompany, input} = this.props;

        let user = {
            ...input.value,
            company: {
                ...input.value.company,
                settings: {
                    ...input.value.company.settings,
                    [field]: value
                }
            },
        };

        input.onChange(user);
        onUpdateCompany(user.company);
    };

    render() {
        const {input, classes} = this.props;
        const user = input.value;

        if (!user || !user.company)
            return <NoData/>;

        return (
            <div className={styles["user-container"]}>
                <CardHeader title="פרטי מנהל"/>

                <CardContent>
                    <Grid container>
                        <Grid item sm={12}>
                            <TextField
                                className={styles["long-field"]}
                                id="fullName"
                                label="שם מלא"
                                value={user.fullName}
                                onChange={(e) => this.handleUserChange("fullName", e)}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Tooltip
                                title="אנחנו מכבדים את הפרטיות שלך - ובאופן כללי לא מאמינים במיילים! - תכלס זה פה כי אולי נעשה עם זה משהו בעתיד.">
                                <TextField
                                    className={styles["long-field"]}
                                    label="דואר אלקטרוני"
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => this.handleUserChange("email", e)}
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardContent>

                <CardHeader title="חברה"/>

                <CardContent>
                    <TextField
                        id="company-name"
                        label="שם"
                        value={user.company.name}
                        onChange={(e) => this.handleCompanyChange("name", e)}
                        className={styles["long-field"]}
                    />

                </CardContent>

                <CardHeader title="הגדרות"/>

                <CardContent>
                    <div className={styles["settings"]}>
                        <div className={styles["row"]}>
                            <TextField
                                id="holiday-start"
                                label="כניסת שבת/חג"
                                value={user.company.settings.eveningHolidayStartHour}
                                onChange={(e) => this.handleCompanySettingsChange("eveningHolidayStartHour", e.target.value)}
                                className={styles["short-field"]}
                                inputProps={{"style": {textAlign: "center"}}}
                            />

                            <TextField
                                id="holiday-end"
                                label="יציאת שבת/חג"
                                value={user.company.settings.holidayEndHour}
                                onChange={(e) => this.handleCompanySettingsChange("holidayEndHour", e.target.value)}
                                className={styles["short-field"]}
                                inputProps={{"style": {textAlign: "center"}}}
                            />
                            <TextField
                                id="holiday-shift-length"
                                label="אורך משמרת בשבת/חג"
                                value={user.company.settings.holidayShiftLength}
                                onChange={(e) => this.handleCompanySettingsChange("holidayShiftLength", e.target.value)}
                                className={styles["short-field"]}
                                inputProps={{"style": {textAlign: "center"}}}
                            />

                        </div>

                        <div className={styles["row"]}>
                            <FormControl className={classes.formControl} disabled>
                                <InputLabel htmlFor="name-disabled">אורך הפסקה (דק') - בקרוב...</InputLabel>
                                <Input id="break-length" value={30} onChange={() => {}} />
                            </FormControl>
                        </div>

                        <div className={styles["row"]}>
                            <FormControlLabel
                                classes={{root: classes.switch}}
                                control={
                                    <Switch
                                        checked={user.company.settings.enableCommute}
                                        onChange={(e) => this.handleCompanySettingsChange("enableCommute", e.target.checked)}
                                        value={user.company.settings.enableCommute}
                                        color="primary"
                                    />
                                }
                                label={<div>החזר נסיעות <a>מה זה</a></div>}
                            />
                        </div>

                        <div className={styles["row"]}>
                            <FormControlLabel
                                classes={{root: classes.switch}}
                                control={
                                    <Switch
                                        checked={user.company.settings.enableTasks}
                                        onChange={(e) => this.handleCompanySettingsChange("enableTasks", e.target.checked)}
                                        value={user.company.settings.enableTasks}
                                        color="primary"
                                    />
                                }
                                label={<div>משימות <a>מה זה</a></div>}
                            />
                        </div>
                    </div>
                </CardContent>

            </div>
        );
    }
}

User.propTypes = {
    onUpdateUser: PropTypes.func.isRequired,
    onUpdateCompany: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default CSSModules(withStyles(styles1)(User), styles);

