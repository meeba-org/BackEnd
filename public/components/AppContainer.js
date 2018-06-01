import React, {Component} from 'react';
import CSSModules from "react-css-modules";
import {DatePicker} from "material-ui-pickers";
import styles from "../styles/App.scss";

class AppContainer extends Component {
    render() {
        return (
            <DatePicker />
        );
    }
}

const MyComponent = () => {
    return (
        <DatePicker/>
    );
};
export default CSSModules(AppContainer, styles);
