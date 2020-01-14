import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {Link} from "react-router";
import styles from '../../styles/User.scss';
import NoData from "../NoData";
import Button from "@material-ui/core/Button";

const styles1 = () => ({
    switch: {
        marginRight: "0px"
    },
    formControl: {
        width: "100%"
    },
    link: {
        textDecoration: "underline",
        fontSize: "0.7rem"
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
        const {input, classes, isCommuteFeatureEnable, hasPremiumFeature, onFreePlanClick, onPremiumPlanClick} = this.props;
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
                    </Grid>
                </CardContent>

                <CardHeader title="חברה"/>

                <CardContent>
                    <Grid container>
                        <Grid item sm={12}>
                            <TextField
                                id="company-name"
                                label="שם"
                                value={user.company.name}
                                onChange={(e) => this.handleCompanyChange("name", e)}
                                className={styles["long-field"]}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Tooltip
                                title="אנחנו מכבדים את הפרטיות שלך - ובאופן כללי לא מאמינים במיילים! - תכלס זה פה כי אולי נעשה עם זה משהו בעתיד.">
                                <TextField
                                    className={styles["long-field"]}
                                    label="דואר אלקטרוני"
                                    type="email"
                                    value={user.company.email}
                                    onChange={(e) => this.handleCompanyChange("email", e)}
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardContent>

                <CardHeader title="מתקדם"/>

                <CardContent>
                    <div className={styles["settings"]}>
                        <div className={styles["row"]}>
                            <TextField
                                id="holiday-start"
                                label="כניסת שבת/חג"
                                value={user.company.settings.eveningHolidayStartHour}
                                onChange={(e) => this.handleCompanySettingsChange("eveningHolidayStartHour", e.target.value)}
                                className={styles["short-field"]}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">00:</InputAdornment>
                                }}
                            />

                            <TextField
                                id="holiday-end"
                                label="יציאת שבת/חג"
                                value={user.company.settings.holidayEndHour}
                                onChange={(e) => this.handleCompanySettingsChange("holidayEndHour", e.target.value)}
                                className={styles["short-field"]}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">00:</InputAdornment>
                                }}
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
                            <FormControl>
                                <InputLabel htmlFor="name-disabled">אורך הפסקה (דק')</InputLabel>
                                <Input id="break-length" value={user.company.settings.breakLength}
                                       onChange={(e) => this.handleCompanySettingsChange("breakLength", e.target.value)}/>
                            </FormControl>
                            <div style={{alignSelf: "flex-end"}}>
                                <Link to="/faq/break" className={classes.link} target="_blank">מה זה?</Link>
                            </div>
                        </div>

                        <this.SettingSwitch classes={classes} text={"הזנת החזר נסיעות ע\"י העובד"} value={user.company.settings.enableCommute}
                                       fieldValue={"enableCommute"} link={"/faq/commute"} />

                        <this.SettingSwitch classes={classes} text={"ימי היעדרות (חופש, מחלה, מילואים)"} value={user.company.settings.enableAbsenceDays}
                                       fieldValue={"enableAbsenceDays"} link={"/faq/absenceDays"} />

                        <this.SettingSwitch classes={classes} text={"משימות"} value={user.company.settings.enableTasks}
                                       fieldValue={"enableTasks"} link={"/faq/tasks"} />

                    </div>
                </CardContent>

                <CardHeader title="תוכנית"/>

                <CardContent>
                    <div className={styles["plan"]}>
                        {hasPremiumFeature &&
                        <Fragment>
                            <div className={styles["text"]}>הינך כרגע מנוי בתוכנית פרימיום</div>
                            <Button onClick={() => onPremiumPlanClick(user.company)} variant="outlined" color="secondary">
                                סיים מנוי
                            </Button>
                        </Fragment>
                        }
                        {!hasPremiumFeature &&
                        <Fragment>
                            <div className={styles["text"]}>הינך כרגע במסלול החינמי</div>
                            <Button onClick={onFreePlanClick} variant="contained" color="secondary">הירשם כמנוי</Button>
                        </Fragment>
                        }
                    </div>
                </CardContent>

            </div>
        );
    }

    SettingSwitch = ({classes, value, fieldValue, text, link}) => {
        return (
            <div className={styles["row"]}>
                <FormControlLabel
                    classes={{root: classes.switch}}
                    control={
                        <Switch
                            checked={value}
                            onChange={(e) => {
                                this.handleCompanySettingsChange(fieldValue, e.target.checked);
                            }}
                            value={value}
                            color="primary"
                        />
                    }
                    label={<div>{text}</div>}
                />
                {link &&
                <div className={styles["whatisit"]}>
                    <Link to={link} className={classes.link} target="_blank">מה זה?</Link>
                </div>
                }
            </div>
        );
    };

}

User.propTypes = {
    onUpdateUser: PropTypes.func.isRequired,
    onUpdateCompany: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    hasPremiumFeature: PropTypes.bool
};

export default withStyles(styles1)(User);

