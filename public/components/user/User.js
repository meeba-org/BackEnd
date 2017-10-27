import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CardContent, CardHeader, TextField} from "material-ui";
import CSSModules from "react-css-modules";
import styles from '../../styles/User.scss';
import NoData from "../NoData";

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
        const {input} = this.props;
        const user = input.value;

        return (
            <div id="user">
                <CardHeader title="פרופיל משתמש"/>

                <CardContent className="card-content">

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
                                id="email"
                                label="דואר אלקטרוני"
                                type="email"
                                value={user.email}
                                onChange={(e) => this.handleUserChange("email", e)}
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

                    < CardContent className="card-content">
                        <TextField
                            id="company-name"
                            label="שם"
                            value={user.company.name}
                            onChange={(e) => this.handleCompanyChange("name", e)}
                        />
                    </CardContent>
                </div>
                }
            </div>
        );
    }
}

User.propTypes = {
    onUpdateUser: PropTypes.func.isRequired,
    onUpdateCompany: PropTypes.func.isRequired,
};

export default CSSModules(User, styles);

