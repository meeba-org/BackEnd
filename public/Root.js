import React from 'react';
import routes from "./routes";
import {Provider} from "react-redux";
import {browserHistory, Router} from "react-router";
import createStore from "./store/configureStore";
import {syncHistoryWithStore} from "react-router-redux";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import brown from '@material-ui/core/colors/brown';
import orange from '@material-ui/core/colors/orange';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const muiTheme = createMuiTheme({
    typography: {
        fontFamily: '"Assistant", sans-serif'
    },
    overrides: {
        MuiIconButton: {
            root: {
                height: "100%",
                width: "initial",
                paddingRight: "10px",
                paddingLeft: "10px",
            }
        },
        MuiInputLabel: {
            root: {
                transformOrigin: "top right"
            },
            shrink: {
                transformOrigin: "top right"
            },
            // formControl: {
            //     left: "initial",
            //     right:0
            // }
        },
        MuiTooltip: {
            tooltip: {
                fontSize: "15px"
            }
        },
        MuiSwitch: {
            root: {
                direction: "ltr"
            },
            checked: {
                transform: "translateX(20px)"
            }
        }
    },
    palette: {
        primary: brown,
        secondary: orange,
    },
});

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);
const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

const Root = () =>
    (<MuiThemeProvider theme={muiTheme}>
        <MessengerCustomerChat
            pageId="2039324052970425"
            appId="976991712448032"
        />
        <Provider store={store}>
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <Router history={history} routes={routes}/>
            </JssProvider>
        </Provider>
    </MuiThemeProvider>);

export default Root;
