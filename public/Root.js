import { hot } from 'react-hot-loader/root';
import {createMuiTheme} from "@material-ui/core";
import {jssPreset, StylesProvider, ThemeProvider} from '@material-ui/core/styles';
import {create} from 'jss';
import rtl from 'jss-rtl';
import React from 'react';
import {Provider} from "react-redux";
import AppContainer from "./components/AppContainer";
import store from "./store/storeService";

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

// Configure JSS
let jss = create({
    plugins: [...jssPreset().plugins, rtl()],
    // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
    insertionPoint: 'jss-insertion-point',
});

const Root = () => (
    <Provider store={store}>
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <AppContainer />
            </ThemeProvider>
        </StylesProvider>
    </Provider>
);

export default hot(Root);
