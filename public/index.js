import {render} from "react-dom";
import React, {Component} from "react";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import CSSModules from "react-css-modules";
import styles from "./styles/App.scss";

class HOCAppContainer extends Component {
    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                HOC
                <DatePicker />
            </MuiPickersUtilsProvider>
        );
    }
}

const DUMBAppContainer = () => {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            DUMB
            <DatePicker />
        </MuiPickersUtilsProvider>
    );
};

const AppContainer = CSSModules(HOCAppContainer, styles);

render(
    <AppContainer/>,
    document.getElementById('react-app')
);
