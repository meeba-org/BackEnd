import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  AppBar,
  Card,
  CardTitle,
  CardText,
  CardActions,
  FlatButton,
  RaisedButton
} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const App = () => {
  return (
    <div>
      <AppBar title="מיבא" />
      <Card>
        <CardTitle title="מיבא" subtitle="מעקב נוכחות" />
        <CardText>
          בדיקת היתכנות לפריימוורק עם תמיכה בעברית וכתיבה מימין לשמאל
        </CardText>
        <CardActions>
          <RaisedButton label="אישור" primary={true} />
          <FlatButton label="ביטול" />
        </CardActions>
      </Card>
    </div>
  );
};

render(
  <MuiThemeProvider
    muiTheme={getMuiTheme({
      isRtl: true
    })}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('react-app')
);
