import {createMuiTheme} from "@material-ui/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import React from 'react';
import {Provider} from "react-redux";
import {browserHistory, Router} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import routes from "./routes";
import createStore from "./store/configureStore";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        useNextVariants: true,
        fontFamily: [
            'Assistant',
            'sans-serif',
        ].join(','),
    },
    overrides: {
        MuiIconButton: {
            root: {
                height: "100%",
                width: "initial",
                padding: "3px",
            }
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
        },
        MuiPickersTimePicker: {
            hourMinuteLabel: {
                direction: "ltr"
            }
        }
    },
    palette: {
        primary: { main: '#94585C' }, //brown,
        secondary: { main: '#F3CBA5' }, //orange,
    },
});

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);
//registerServiceWorker();

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const Root = () => (
    <Provider store={store}>
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Router history={history} routes={routes}/>
            </ThemeProvider>);
        </StylesProvider>
    </Provider>
);

export default Root;
