import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import CSSModules from "react-css-modules";
import styles from '../../styles/User.scss';
import NoData from "../NoData";
import withStyles from '@material-ui/core/styles/withStyles';

const cssStyles = {
    input: {
        minWidth: "318px"
    }
};

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

    render() {
        const {input, classes} = this.props;
        const user = input.value;

        return (
            <Fragment>
                <CardHeader title="פרטי מנהל"/>

                <CardContent className={styles["card-content"]}>

                    {!!user &&
                    <div className={styles["user-container"]}>
                        <TextField
                            className={styles["long-field"]}
                            id="fullName"
                            label="שם מלא"
                            value={user.fullName}
                            onChange={(e) => this.handleUserChange("fullName", e)}
                        />
                        <Tooltip title="אנחנו מכבדים את הפרטיות שלך - ובאופן כללי לא מאמינים במיילים! - תכלס זה פה כי אולי נעשה עם זה משהו בעתיד.">
                            <TextField
                                className={styles["long-field"]}
                                label="דואר אלקטרוני"
                                type="email"
                                value={user.email}
                                onChange={(e) => this.handleUserChange("email", e)}
                                InputProps={{
                                    className: classes.input
                                }}
                            />
                        </Tooltip>
                    </div>
                    }
                    {!user &&
                    <NoData/>
                    }
                </CardContent>

                {!!user.company &&
                <div>
                    <CardHeader title="חברה"/>

                    <CardContent className={styles["card-content"]}>
                        <TextField
                            id="company-name"
                            label="שם"
                            value={user.company.name}
                            onChange={(e) => this.handleCompanyChange("name", e)}
                        />
                    </CardContent>
                </div>
                }
            </Fragment>
        );
    }
}

User.propTypes = {
    onUpdateUser: PropTypes.func.isRequired,
    onUpdateCompany: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(cssStyles)(CSSModules(User, styles));

