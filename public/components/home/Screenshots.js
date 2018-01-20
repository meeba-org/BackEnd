import React, {Component} from 'react';
import styles from "../../styles/screenshots.scss";
import CSSModules from "react-css-modules";
import ERoles from "../../helpers/ERoles";
import {Button} from "material-ui";

class Screenshots extends Component {
    state = {
        role: ERoles.COMPANY_MANAGER
    };

    updateRole = (role) => {
        this.setState({role});
    };

    isRole = (role) => {
        console.log(this.state.role);
        return this.state.role === role;
    };

    getColor(role) {
        return this.isRole(role) ? "primary" : "";
    }

    render() {
        return (
            <div id="screenshots">
                <div id="roles">
                    <Button color={"primary"} onClick={() => this.updateRole(ERoles.COMPANY_MANAGER)}>מנהל</Button>
                    <Button color={"primary"} onClick={() => this.updateRole(ERoles.EMPLOYEE)}>עובד</Button>
                </div>
                <div id="images">
                {this.state.role === ERoles.COMPANY_MANAGER &&
                    <img src="../../styles/images/sc1.png"/>
                }
                {this.state.role === ERoles.EMPLOYEE &&
                    <img src="../../styles/images/appStore.svg"/>
                }
                </div>
            </div>
        );
    }
}

Screenshots.propTypes = {};
Screenshots.defaultProps = {};

export default CSSModules(Screenshots, styles);
