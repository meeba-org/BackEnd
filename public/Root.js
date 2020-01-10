import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {create} from 'jss';
import rtl from 'jss-rtl';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {Provider} from "react-redux";
import Routes from "./routes";
import configureStore from "./store/configureStore";

const muiTheme = createMuiTheme({
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

const store = configureStore();

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

const Root = () =>
    (<MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
                <JssProvider jss={jss} generateClassName={generateClassName}>
                    <Routes/>
                </JssProvider>
        </Provider>
    </MuiThemeProvider>);

export default Root;
