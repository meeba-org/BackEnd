import React from "react";
import CSSModules from "react-css-modules";
import styles from "../styles/Content.scss";
import EmployeesContainer from "./EmployeesContainer";

class Content extends React.Component {
    submit() {
    }

    render() {
        return (
            <div>
                <form id="content"
                      onSubmit={this.submit}>
                    <div>
                        <EmployeesContainer />
                    </div>
                </form>
            </div>
        );
    }
}

export default CSSModules(Content, styles);
