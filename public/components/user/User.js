import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {CardContent, CardHeader, TextField} from "@material-ui/core";
import CSSModules from "react-css-modules";
import styles from '../../styles/User.scss';
import NoData from "../NoData";
import {withStyles} from '@material-ui/core/styles';

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
                <CardHeader title="פרופיל משתמש"/>

                <CardContent className={styles["card-content"]}>

                    {!!user &&
                    <div>
                        <div>
                            <TextField
                                id="firstName"
                                label="פרטי"
                                value={user.firstName}
                                onChange={(e) => this.handleUserChange("firstName", e)}
                            />
                            <TextField
                                id="lastName"
                                label="משפחה"
                                value={user.lastName}
                                onChange={(e) => this.handleUserChange("lastName", e)}
                            />
                        </div>
                        <div>
                            <TextField
                                className={styles["email"]}
                                label="דואר אלקטרוני"
                                type="email"
                                value={user.email}
                                onChange={(e) => this.handleUserChange("email", e)}
                                InputProps={{
                                    className: classes.input
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="uid"
                                label="ת.ז."
                                type="number"
                                value={user.uid}
                                onChange={(e) => this.handleUserChange("uid", e)}
                            />
                        </div>
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

