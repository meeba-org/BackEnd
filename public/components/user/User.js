import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextField} from "material-ui";
import CSSModules from "react-css-modules";
import styles from '../../styles/User.scss';
import NoData from "../NoData";

class User extends Component {
    handleChange = () => {
        const {onChange, input} = this.props;
        onChange(input.value);
    };

    render() {
        const {input} = this.props;
        const user = input.value;

        return (
            <div id="user">
                {!!user &&
                <div>
                    <div>
                        <TextField
                            id="firstName"
                            label="פרטי"
                            value={user.firstName}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="lastName"
                            label="משפחה"
                            value={user.lastName}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="email"
                            label="דואר אלקטרוני"
                            type="email"
                            value={user.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="uid"
                            label="ת.ז."
                            type="number"
                            value={user.uid}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                }
                {!user &&
                <NoData/>
                }
            </div>
        );
    }
}

User.propTypes = {
    onUpdate: PropTypes.func.isRequired,
};

export default CSSModules(User, styles);

