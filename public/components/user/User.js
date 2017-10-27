import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CardContent, CardHeader, TextField} from "material-ui";
import CSSModules from "react-css-modules";
import styles from '../../styles/User.scss';
import NoData from "../NoData";

class User extends Component {
    handleChange = (field, e) => {
        const {onUpdate, input} = this.props;
        const value = e.target.value;

        let user = {
            ...input.value,
            [field]: value
        };

        input.onChange(user);
        onUpdate(user);
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
                                onChange={(e) => this.handleChange("firstName", e)}
                            />
                            <TextField
                                id="lastName"
                                label="משפחה"
                                value={user.lastName}
                                onChange={(e) => this.handleChange("lastName", e)}
                            />
                        </div>
                        <div>
                            <TextField
                                id="email"
                                label="דואר אלקטרוני"
                                type="email"
                                value={user.email}
                                onChange={(e) => this.handleChange("email", e)}
                            />
                        </div>
                        <div>
                            <TextField
                                id="uid"
                                label="ת.ז."
                                type="number"
                                value={user.uid}
                                onChange={(e) => this.handleChange("uid", e)}
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
                            onChange={(e) => this.handleChange("company.name", e)}
                        />
                    </CardContent>
                </div>
                }
            </div>
        );
    }
}

User.propTypes = {
    onUpdate: PropTypes.func.isRequired,
};

export default CSSModules(User, styles);

