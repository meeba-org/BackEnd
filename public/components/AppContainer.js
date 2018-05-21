import React, {Component} from 'react';
import CSSModules from "react-css-modules";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

class AppContainer extends Component {
    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                HOC
                <DatePicker />
            </MuiPickersUtilsProvider>
        );
    }
}

const MyComponent = () => {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            DUMB
            <DatePicker />
        </MuiPickersUtilsProvider>
    );
};
export default CSSModules(AppContainer);
