import {render} from "react-dom";
import React from "react";
import AppContainer from "./components/AppContainer";
import {MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <AppContainer/>
    </MuiPickersUtilsProvider>,
    document.getElementById('react-app')
);
